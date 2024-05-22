import { TSvg } from "@atoms/types";

const CaretLeftIcon = ({
  fill = "#fff",
  width = "16",
  height = "16"
}: TSvg) => {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={fill} viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>
  );
};

export default CaretLeftIcon;