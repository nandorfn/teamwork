import Link from "next/link";
import React from "react";

const ProjectsPage = ({
  children
}: {
  children: React.ReactNode
}) => {
  const submenus = ["timeline", "backlog", "board"]
  return (
    <div className="flex flex-col px-8 pt-8 gap-10 w-[calc(100vw-192.5px)]">
      <Link href={'/projects'}>Projects</Link>
      <h2 className="text-5xl font-light">Project 2</h2>

      <div className="flex flex-row gap-20">
        {submenus?.map((item, index) => (
          <Link
            key={index}
            href={`/projects/${item}`}
            className="capitalize"
          >
            {item}
          </Link>
        ))
        }
      </div>
      <div className=" overflow-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default ProjectsPage;