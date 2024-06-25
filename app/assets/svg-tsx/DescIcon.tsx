import { TSvg } from "@atoms/types";

const DescIcon = ({
  fill,
  width = "16",
  height = "16"
}: TSvg) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={fill} viewBox="0 0 256 256"><path d="M40,128a8,8,0,0,1,8-8h72a8,8,0,0,1,0,16H48A8,8,0,0,1,40,128Zm8-56h56a8,8,0,0,0,0-16H48a8,8,0,0,0,0,16ZM184,184H48a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16ZM229.66,82.34l-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,11.32,11.32L176,67.31V144a8,8,0,0,0,16,0V67.31l26.34,26.35a8,8,0,0,0,11.32-11.32Z"></path></svg>
    );
};

export default DescIcon;