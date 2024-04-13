import { Separator } from "@components/ui/separator";
import Link from "next/link";
import { TMockIssue } from "../../../../utils/mock/mockIssueCard";

const IssueCard = ({
  issue
}: { issue: TMockIssue }) => {
  return (
    <Link href="/" className="flex flex-row justify-between items-center p-2 hover:bg-zinc-800 rounded-md">
      <div>
        <h3>{issue?.name}</h3>
        <div className="flex items-center flex-row text-xs text-base-100 gap-1">
          <p>{issue?.key}</p>
          <Separator className="w-1" />
          <p>{issue?.project}</p>
        </div>
      </div>

      <p className="text-xs text-base-100">{issue?.status}</p>
    </Link>
  );
};

export default IssueCard;