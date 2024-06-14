import { OutputFileEntry } from "@uploadcare/blocks";

export type TPhoto = Pick<
  OutputFileEntry,
  "uuid" | "cdnUrl" | "fullPath" | "uploadProgress" | "fileInfo" | "isSuccess" | "errors"
>;

export interface TResponseObj<T> {
  id: string;
  data: T;
}

function pruneImageObj(file: OutputFileEntry<"success">): TPhoto {
  const { uuid, cdnUrl, fullPath, uploadProgress, fileInfo, isSuccess, errors } = file;

  return {
    uuid,
    cdnUrl,
    fullPath,
    uploadProgress,
    fileInfo,
    isSuccess,
    errors,
  };
}

export async function fetchPhotos() {
  const apiRes = await fetch(`/api/photos`);

  if (!apiRes.ok) {
    throw new Error(`Photos fetch not ok`);
  }
  return apiRes.json();
}

export async function savePhotos(files: OutputFileEntry<"success">[]) {
  const pruned = files.map(file => pruneImageObj(file));
  const apiRes = await fetch(`/api/photos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pruned),
  });
  if (!apiRes.ok) {
    throw new Error(`save not ok`);
  }
  return apiRes.json();
}

export async function fetchPhotoByID(id: string | undefined) {
  if (!id) {
    return null;
  }

  const apiRes = await fetch(`/api/photos/${id}`);

  if (!apiRes.ok) {
    throw new Error(`/api/photos/${id} fetch not ok`);
  }
  return apiRes.json();
}
