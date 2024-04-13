import { Avatar, Badge } from "@components/atoms";
import dummyAvatar from "@assets/dummy/avatar.svg"
import React from "react";

const TodoCard = () => {
  const badges = ["Slicing", "UI/UX"]
  return (
    <div className=" border rounded-lg p-3 gap-3 flex flex-col">
      <div className="flex flex-row gap-3">
        {
          badges.map((item, index) => (
            <React.Fragment key={index}>
              <Badge text={item} />
            </React.Fragment>
          ))
        }
      </div>

      <div>
        <h4 className="text-xl">Slicing Admin</h4>
        <p className="text-base-grey line-clamp-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis perspiciatis vel id quam, magni debitis beatae? Facere quae officia odio! Labore obcaecati dolores aut, blanditiis adipisci maiores numquam nulla esse.
        </p>
      </div>

      <div className="flex flex-row relative">
        <Avatar src={dummyAvatar} className="z-[1]" />
        <Avatar src={dummyAvatar} className="z-[2] -ml-1" />
        <Avatar src={dummyAvatar} className="z-[3] -ml-2" />
      </div>

    </div>
  );
};

export default TodoCard;