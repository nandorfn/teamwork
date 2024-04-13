import Link from "next/link";

const ProjectCard: React.FC = () => {
  return (
    <Link 
      href={'/'} 
      className="flex flex-col gap-2 min-w-80 border hover:border-blue-500 hover:shadow-md hover:shadow-blue-900 bg-zinc-800 rounded-md px-4 py-4 mb-4">
      <div>
        <h2 className="px-2 text-xl font-medium">Project 2</h2>
        <p className="px-2 text-sm text-base-100">Software Project</p>
      </div>

      <div>
        <h2 className="px-2 text-blue-500">QUICK LINKS</h2>
        <div className="flex flex-col text-sm">
          <p className=" hover:bg-[#A1A1A1] rounded-sm px-2">My Open Issues</p>
          <p className=" hover:bg-[#A1A1A1] rounded-sm px-2">Done Issues</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;