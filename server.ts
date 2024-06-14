import type { Request, Response, NextFunction } from "express";
import fs from "fs";
import path, { dirname } from "path";
import express from "express";
import compression from "compression";
import serveStatic from "serve-static";
import bodyParser from "body-parser";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";
import pg from "pg";
const { Pool } = pg;
import { TPhoto } from "@/api/photos";
configDotenv();

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolve = (p: string) => path.resolve(__dirname, p);

const getStyleSheets = async () => {
  try {
    const assetpath = resolve("public");
    const files = await fs.promises.readdir(assetpath);
    const cssAssets = files.filter(l => l.endsWith(".css"));
    const allContent = [];
    for (const asset of cssAssets) {
      const content = await fs.promises.readFile(path.join(assetpath, asset), "utf-8");
      allContent.push(`<style type="text/css">${content}</style>`);
    }
    return allContent.join("\n");
  } catch {
    return "";
  }
};

const pool = new Pool({
  ssl: {
    ca: fs.readFileSync("ca.crt").toString(),
  },
});

async function seedDB() {
  const client = await pool.connect();
  const createTableText = `
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  
  CREATE TABLE IF NOT EXISTS images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
  `;
  // create our table
  await client.query(createTableText);
  console.log("DB Tables Created");
}
seedDB();

async function createServer(isProd = process.env.NODE_ENV === "production") {
  const app = express();

  app.use(bodyParser.json());
  //GET /api/photos
  app.get("/api/photos", async (req: Request, res: Response) => {
    const client = await pool.connect();
    try {
      const result = await client.query(`SELECT id, "data"
      FROM "images" ORDER BY created_at DESC`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  //POST /api/photos
  app.post("/api/photos", async (req: Request, res: Response) => {
    const client = await pool.connect();
    try {
      const values: TPhoto[] = req.body;
      const insertQuery = `INSERT INTO images(data) VALUES($1)`;

      const promises = values.map(row => client.query(insertQuery, [row]));
      await Promise.all(promises);
      res.status(200).send({ isSuccessful: true, data: values });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);
      res.status(500).send("Internal Server Error");
    } finally {
      client.release();
    }
  });
  //GET /api/photos
  app.get("/api/photos/:id", async (req: Request, res: Response) => {
    const client = await pool.connect();
    const id = req.params.id;
    try {
      const query = `SELECT id, "data"
      FROM "images" WHERE id = $1`;
      const result = await client.query(query, [id]);
      if (result.rows.length === 0) {
        res.status(404).send("Resource not found");
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: isTest ? "error" : "info",
    root: isProd ? "dist" : "",
    optimizeDeps: { include: [] },
  });

  app.use(vite.middlewares);
  const assetsDir = resolve("public");
  const requestHandler = express.static(assetsDir);
  app.use(requestHandler);
  app.use("/public", requestHandler);

  if (isProd) {
    app.use(compression());
    app.use(
      serveStatic(resolve("client"), {
        index: false,
      }),
    );
  }
  const stylesheets = getStyleSheets();

  const baseTemplate = await fs.promises.readFile(
    isProd ? resolve("client/index.html") : resolve("index.html"),
    "utf-8",
  );
  const productionBuildPath = path.join(__dirname, "./server/entry-server.js");
  const devBuildPath = path.join(__dirname, "./src/client/entry-server.tsx");
  const buildModule = isProd ? productionBuildPath : devBuildPath;
  const { render } = await vite.ssrLoadModule(buildModule);

  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      const template = await vite.transformIndexHtml(url, baseTemplate);
      const appHtml = await render(url);
      const cssAssets = await stylesheets;

      const html = template.replace(`<!--app-html-->`, appHtml).replace(`<!--head-->`, cssAssets);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);

      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
  const port = process.env.PORT || 7456;
  app.listen(Number(port), "0.0.0.0", () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
}

createServer();
