import Image from "next/image";
import { IconTypes } from "@molecules/types";
const Icon = ({
  src,
  alt,
  width = 16,
  height = 16,
}: IconTypes) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default Icon;
