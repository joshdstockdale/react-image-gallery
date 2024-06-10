import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { requireUser } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request);
  return json({ user });
};

export default function AdminLayout() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <nav className="w-full flex justify-between items-center">
        <h1>Admin Section</h1>
        <div className="flex">
          <div>{user.email}</div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
