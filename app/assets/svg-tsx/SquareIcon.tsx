import { TSvg } from "@atoms/types";

const SquareIcon = ({ fill, width = "16", height = "16" }: TSvg) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={fill} width={width} height={height} fill="#000000" viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Z"></path></svg>
  );
};

export default SquareIcon;