import { OutputFileEntry } from "@uploadcare/blocks";

interface IProps {
  images: OutputFileEntry[];
}

const Photos = (props: IProps) => {
  const { images } = props;
  return (
    <div className="gap-4 columns-3 sm:columns-2">
      {images.map((img) => {
        return <div>Image name: {img.name}</div>;
      })}
    </div>
  );
};

export default Photos;
