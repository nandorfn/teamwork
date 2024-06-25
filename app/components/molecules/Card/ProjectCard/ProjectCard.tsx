import { TProjectList } from "@molecules/types";
import { useRouter } from "next/navigation";

const ProjectCard = ({data}: { data: TProjectList}) => {
  const router = useRouter();
  const navigateRoute = (status: string) => router.push(`/projects/${data.id}/${status}`);
  return (
    <div 
      className="flex flex-col gap-2 min-w-80 border dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-900 dark:bg-zinc-800 rounded-md px-4 py-4 mb-4">
      <div>
        <h2 className="px-2 text-xl font-medium">{data?.name}</h2>
        <p className="px-2 text-sm text-base-100">Software Project</p>
      </div>

      <div>
        <h2 className="px-2 text-blue-500">QUICK LINKS</h2>
        <div className="flex flex-col text-sm">
          <p 
            onClick={() => navigateRoute("backlog")} 
            className="hover:bg-zinc-200 dark:hover:bg-[#A1A1A1] cursor-pointer rounded-sm px-2">Backlog List</p>
          <p 
            onClick={() => navigateRoute("board")} 
            className="hover:bg-zinc-200 dark:hover:bg-[#A1A1A1] cursor-pointer rounded-sm px-2">Board List</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;