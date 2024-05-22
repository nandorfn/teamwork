import { TSvg } from "@atoms/types";

const ChevronUpDown = ({
  fill = "#fff",
  width = "16",
  height = "16"
}: TSvg) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={fill} viewBox="0 0 256 256"><path d="M184.49,167.51a12,12,0,0,1,0,17l-48,48a12,12,0,0,1-17,0l-48-48a12,12,0,0,1,17-17L128,207l39.51-39.52A12,12,0,0,1,184.49,167.51Zm-96-79L128,49l39.51,39.52a12,12,0,0,0,17-17l-48-48a12,12,0,0,0-17,0l-48,48a12,12,0,0,0,17,17Z"></path></svg>
  );
};

export default ChevronUpDown;