import { IssueCard, ProjectCard } from "@components/molecules";

const MyTask: React.FC = () => {
  return (
    <div className="flex flex-col p-4">
      <h1 className=" text-2xl">Recent Projects</h1>
      <div className="flex flex-row gap-3 overflow-x-auto w-[calc(100vw-230px)]">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      <h1 className=" text-2xl">Assigned to me</h1>
      <div>
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
      </div>
    </div>
  );
};

export default MyTask;