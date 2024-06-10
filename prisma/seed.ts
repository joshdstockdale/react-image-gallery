import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.photo.create({
    data: {
      uuid: "1be82782-2cfe-4269-8ea3-da4279a1c7f4",
      name: "arthur-humeau-3xwdarHxHqI-unsplash.jpg",
      size: 1657550,
      cdnUrl: "https://ucarecdn.com/1be82782-2cfe-4269-8ea3-da4279a1c7f4/",
      fullPath: "/arthur-humeau-3xwdarHxHqI-unsplash.jpg",
      originalFilename: "arthur-humeau-3xwdarHxHqI-unsplash.jpg",
    },
  });
  await prisma.photo.create({
    data: {
      uuid: "57a9505d-1118-4f0b-8417-0efa780e35f6",
      name: "bharat-patil-WR5_Ev_bh-I-unsplash.jpg",
      size: 974188,
      cdnUrl: "https://ucarecdn.com/57a9505d-1118-4f0b-8417-0efa780e35f6/",
      fullPath: "/bharat-patil-WR5_Ev_bh-I-unsplash.jpg",
      originalFilename: "bharat-patil-WR5_Ev_bh-I-unsplash.jpg",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
