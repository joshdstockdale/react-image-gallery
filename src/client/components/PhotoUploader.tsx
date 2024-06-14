import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as LR from "@uploadcare/blocks";
import "@uploadcare/react-uploader/core.css";

import { formatSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { savePhotos } from "@/api/photos";

LR.registerBlocks(LR);

export default function PhotoUploader() {
  const [files, setFiles] = useState<LR.OutputFileEntry<"success">[]>([]);
  const ctxProviderRef = useRef<InstanceType<LR.UploadCtxProvider>>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const ctxProvider = ctxProviderRef.current;
    if (!ctxProvider) return;

    const handleChangeEvent = (e: LR.EventMap["change"]) => {
      setFiles([...e.detail.allEntries.filter(f => f.status === "success")] as LR.OutputFileEntry<"success">[]);
    };
    ctxProvider.addEventListener("change", handleChangeEvent);
    return () => {
      ctxProvider.removeEventListener("change", handleChangeEvent);
    };
  }, [setFiles]);

  const update = useMutation({
    mutationFn: (files: LR.OutputFileEntry<"success">[]) => savePhotos(files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      ctxProviderRef.current?.uploadCollection.clearAll();
    },
  });

  return (
    <>
      <h2 className="text-2xl">Upload Files</h2>
      <lr-config
        ctx-name="my-uploader-3"
        pubkey="1ebff484d858d9c647d8"
        maxLocalFileSizeBytes={10000000}
        imgOnly={true}
        sourceList="local, url, camera, dropbox"
      ></lr-config>
      <lr-file-uploader-regular ctx-name="my-uploader-3"></lr-file-uploader-regular>
      <lr-upload-ctx-provider ctx-name="my-uploader-3" ref={ctxProviderRef}></lr-upload-ctx-provider>

      {/* <FileUploaderRegular ref={ctxRef}
            className="bg-zinc-100 w-fit rounded border-zinc-400 border "
            onChange={handleChangeEvent}
            pubkey="1ebff484d858d9c647d8"
            maxLocalFileSizeBytes={10000000}
            imgOnly={true}
            sourceList="local, url, camera, dropbox"
          /> */}
      <h3 className="underline my-2">Temp Files</h3>
      <div>
        {files.map(file => (
          <div className="flex items-center py-1 border-t" key={file.uuid}>
            <img
              key={file.uuid}
              src={`${file.cdnUrl}/-/preview/-/resize/x100/`}
              width="50"
              height="50"
              alt={file.fileInfo.originalFilename || ""}
              title={file.fileInfo.originalFilename || ""}
            />
            <div className="ml-2">
              <div className="text-sm">
                <label className="font-bold">Name: </label>
                {file.fileInfo.originalFilename}
              </div>
              <div className="text-sm">
                <label className="font-bold">Size: </label>
                {formatSize(file.fileInfo.size)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-2" disabled={files.length === 0} onClick={() => update.mutate(files)}>
        {files.length === 0 ? "No Files to Save" : "Save to DB"}
      </Button>
    </>
  );
}
