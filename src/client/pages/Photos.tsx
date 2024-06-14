import React, { Suspense, lazy } from "react";

import PhotoGallery from "@/components/PhotoGallery";
const PhotoUploader = lazy(() => import("@/components/PhotoUploader"));

export default function PhotosPage() {
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col m-auto px-4">
      <div className="h-screen max-w-2xl pt-4 w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <PhotoUploader />
        </Suspense>

        <PhotoGallery />
      </div>
    </div>
  );
}
