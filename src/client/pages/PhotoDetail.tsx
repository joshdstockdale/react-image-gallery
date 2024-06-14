import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TPhoto, TResponseObj, fetchPhotoByID } from "@/api/photos";

type IQuery = {
  isPending: boolean;
  error: Error | null;
  data: TResponseObj<TPhoto> | undefined;
};
export default function PhotoDetailPage() {
  const { id } = useParams();
  const { data }: IQuery = useQuery({ queryKey: ["photosByID"], queryFn: () => fetchPhotoByID(id) });

  return data ? (
    <img
      src={data?.data.cdnUrl || ""}
      width={data?.data.fileInfo?.imageInfo?.width}
      height={data?.data.fileInfo?.imageInfo?.height}
      alt={data?.data.fileInfo?.originalFilename || ""}
      title={data?.data.fileInfo?.originalFilename || ""}
    />
  ) : (
    <div>Not Found</div>
  );
}
