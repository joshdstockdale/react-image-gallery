import { OutputFileEntry } from "@uploadcare/blocks";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "./App.css";

import "@uploadcare/react-uploader/core.css";
import Photos from "./components/Photos";

const mockPhotos: OutputFileEntry<"success">[] = [
  {
    uuid: "1be82782-2cfe-4269-8ea3-da4279a1c7f4",
    internalId: "6GYw7vtML-Z6K",
    name: "arthur-humeau-3xwdarHxHqI-unsplash.jpg",
    size: 1657550,
    isImage: true,
    mimeType: "image/jpeg",
    file: null,
    externalUrl: null,
    cdnUrlModifiers: "",
    cdnUrl: "https://ucarecdn.com/1be82782-2cfe-4269-8ea3-da4279a1c7f4/",
    fullPath: "/arthur-humeau-3xwdarHxHqI-unsplash.jpg",
    uploadProgress: 100,
    fileInfo: {
      uuid: "1be82782-2cfe-4269-8ea3-da4279a1c7f4",
      name: "arthurhumeau3xwdarHxHqIunsplash.jpg",
      size: 1657550,
      isStored: true,
      isImage: true,
      mimeType: "image/jpeg",
      cdnUrl: "https://ucarecdn.com/1be82782-2cfe-4269-8ea3-da4279a1c7f4/",
      s3Url: null,
      originalFilename: "arthur-humeau-3xwdarHxHqI-unsplash.jpg",
      imageInfo: {
        dpi: [72, 72],
        width: 2400,
        format: "JPEG",
        height: 3600,
        sequence: false,
        colorMode: "RGB",
        orientation: null,
        geoLocation: null,
        datetimeOriginal: null,
      },
      videoInfo: null,
      contentInfo: {
        mime: {
          mime: "image/jpeg",
          type: "image",
          subtype: "jpeg",
        },
        image: {
          dpi: [72, 72],
          width: 2400,
          format: "JPEG",
          height: 3600,
          sequence: false,
          colorMode: "RGB",
          orientation: null,
          geoLocation: null,
          datetimeOriginal: null,
        },
      },
      metadata: {},
      s3Bucket: null,
      defaultEffects: null,
    },
    metadata: {},
    isSuccess: true,
    isUploading: false,
    isFailed: false,
    isRemoved: false,
    errors: [],
    status: "success",
  },
  {
    uuid: "57a9505d-1118-4f0b-8417-0efa780e35f6",
    internalId: "qOqnI0Svy-nMY",
    name: "bharat-patil-WR5_Ev_bh-I-unsplash.jpg",
    size: 974188,
    isImage: true,
    mimeType: "image/jpeg",
    file: null,
    externalUrl: null,
    cdnUrlModifiers: "",
    cdnUrl: "https://ucarecdn.com/57a9505d-1118-4f0b-8417-0efa780e35f6/",
    fullPath: "/bharat-patil-WR5_Ev_bh-I-unsplash.jpg",
    uploadProgress: 100,
    fileInfo: {
      uuid: "57a9505d-1118-4f0b-8417-0efa780e35f6",
      name: "bharatpatilWR5_Ev_bhIunsplash.jpg",
      size: 974188,
      isStored: true,
      isImage: true,
      mimeType: "image/jpeg",
      cdnUrl: "https://ucarecdn.com/57a9505d-1118-4f0b-8417-0efa780e35f6/",
      s3Url: null,
      originalFilename: "bharat-patil-WR5_Ev_bh-I-unsplash.jpg",
      imageInfo: {
        dpi: [72, 72],
        width: 2400,
        format: "JPEG",
        height: 1600,
        sequence: false,
        colorMode: "RGB",
        orientation: null,
        geoLocation: null,
        datetimeOriginal: null,
      },
      videoInfo: null,
      contentInfo: {
        mime: {
          mime: "image/jpeg",
          type: "image",
          subtype: "jpeg",
        },
        image: {
          dpi: [72, 72],
          width: 2400,
          format: "JPEG",
          height: 1600,
          sequence: false,
          colorMode: "RGB",
          orientation: null,
          geoLocation: null,
          datetimeOriginal: null,
        },
      },
      metadata: {},
      s3Bucket: null,
      defaultEffects: null,
    },
    metadata: {},
    isSuccess: true,
    isUploading: false,
    isFailed: false,
    isRemoved: false,
    errors: [],
    status: "success",
  },
];

function App() {
  return (
    <>
      <FileUploaderRegular
        pubkey="1ebff484d858d9c647d8"
        maxLocalFileSizeBytes={10000000}
        imgOnly={true}
        sourceList="local, url, camera, gdrive"
      />
      <Photos images={mockPhotos} />
    </>
  );
}

export default App;
