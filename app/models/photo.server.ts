import { prisma } from "~/db.server";

export function getPhotoListItems() {
  return prisma.photo.findMany({
    select: {
      uuid: true,
      name: true,
      size: true,
      cdnUrl: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
