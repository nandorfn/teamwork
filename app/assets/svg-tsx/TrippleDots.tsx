import { TSvg } from "@atoms/types";

const TrippleDots = ({
  fill,
  width = "16",
  height = "16"
}: TSvg) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={fill} viewBox="0 0 256 256"><path d="M128,96a32,32,0,1,0,32,32A32,32,0,0,0,128,96Zm0,40a8,8,0,1,1,8-8A8,8,0,0,1,128,136Zm80-40a32,32,0,1,0,32,32A32,32,0,0,0,208,96Zm0,40a8,8,0,1,1,8-8A8,8,0,0,1,208,136ZM48,96a32,32,0,1,0,32,32A32,32,0,0,0,48,96Zm0,40a8,8,0,1,1,8-8A8,8,0,0,1,48,136Z"></path></svg>
    </>
  );
};

export default TrippleDots;