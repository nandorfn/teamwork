import Image, { StaticImageData } from "next/image";

const Avatar = ({
  src,
  className
}: {
  className: string,
  src: StaticImageData | string
}) => {
  return (
      <Image
        className={className}
        src={src}
        width={24}
        height={24}
        alt=""
      />
  );
};

export default Avatar;