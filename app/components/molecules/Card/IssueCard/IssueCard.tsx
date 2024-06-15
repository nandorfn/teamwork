import Link from "next/link";
import { TIssuesByAssigne } from "@server/types";
import { Separator } from "@components/ui/separator";

const IssueCard = ({
  issue
}: { issue: TIssuesByAssigne }) => {
  return (
    <Link 
      href={`/projects/${issue?.projectId}`} 
      className="flex border flex-row justify-between items-center p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md">
      <div>
        <h3>{issue?.summary}</h3>
        <div className="flex items-center flex-row text-xs text-base-100 gap-1">
          <p>{issue?.project?.key}</p>
          <Separator className="w-1" />
          <p>{issue?.project?.name}</p>
        </div>
      </div>

      <p className="text-xs text-base-100">{issue?.workflowStatus?.name}</p>
    </Link>
  );
};

export default IssueCard;