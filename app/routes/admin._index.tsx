import { json, useLoaderData } from "@remix-run/react";

import { getPhotoListItems } from "~/models/photo.server";

export const loader = async () => {
  return json({ photos: await getPhotoListItems() });
};

export default function AdminHome() {
  const { photos } = useLoaderData<typeof loader>();

  return;
  <div className="columns-3 gap-4">
    {photos.map((photo) => (
      <div key={photo.uuid}>{photo.name}</div>
    ))}
  </div>;
}
