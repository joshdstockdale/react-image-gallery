import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TResponseObj, TPhoto, fetchPhotos } from "../api/photos";
import { Link } from "react-router-dom";

type IQuery = {
  isPending: boolean;
  error: Error | null;
  data: TResponseObj<TPhoto>[] | undefined;
};
export default function PhotoGallery() {
  const { isPending, error, data }: IQuery = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });
  if (isPending) {
    return (
      <div className="loading-pane">
        <h2 className="loader">☺️</h2>
      </div>
    );
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }
  return (
    <>
      <h2 className="text-2xl mt-4">Saved Files</h2>
      <small className="italic text-sm text-zinc-500">(Click to Open at Full Resolution)</small>
      <div className="grid grid-cols-3 gap-4">
        {data ? (
          data.map(
            file =>
              file.data.uuid &&
              file.data.cdnUrl &&
              file.data.fileInfo && (
                <div key={file?.id}>
                  <Link to={file.id} target="_blank" title={file.data.fileInfo.originalFilename || ""}>
                    <img
                      key={file.id}
                      src={`${file.data.cdnUrl}/-/preview/-/resize/x400/`}
                      width="200"
                      height="200"
                      alt={file.data.fileInfo.originalFilename || ""}
                      title={file.data.fileInfo.originalFilename || ""}
                    />
                  </Link>
                </div>
              ),
          )
        ) : (
          <div>No Records Found</div>
        )}
      </div>
    </>
  );
}
