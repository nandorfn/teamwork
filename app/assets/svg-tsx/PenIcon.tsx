import { TSvg } from "@atoms/types";

const PenIcon = ({
  fill,
  width = "16",
  height = "16"
}: TSvg) => {
    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={fill} viewBox="0 0 256 256"><path d="M230.14,70.54,185.46,25.85a20,20,0,0,0-28.29,0L33.86,149.17A19.85,19.85,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.86,19.86,0,0,0,14.14-5.86L230.14,98.82a20,20,0,0,0,0-28.28ZM91,204H52V165l84-84,39,39ZM192,103,153,64l18.34-18.34,39,39Z"></path></svg>
        </>
    );
};

export default PenIcon;