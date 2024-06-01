import Image, { StaticImageData } from "next/image";
import { useState } from "react";

const Avatar = ({
  src,
  className,
  alt,
  name,
  color
}: {
  className: string,
  src: StaticImageData | string,
  alt: string,
  name: string,
  color: string,
}) => {
  const [isHover, setIsHover] =useState(false);

  if (src === "") {
    return (
      <div 
        onMouseOver={() => setIsHover(true)} 
        onMouseLeave={() => setIsHover(false)} 
        className={`flex justify-center items-center text-center text-white w-6 h-6 ${color} rounded-full relative cursor-pointer`}>
        <p>{alt}</p>
        {isHover &&
          <p className="bg-slate-300 absolute text-xs top-4 text-black rounded-sm px-1">{name}</p>
        }
      </div>
    );
  }

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