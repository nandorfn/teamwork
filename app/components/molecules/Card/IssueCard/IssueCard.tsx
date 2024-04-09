import { Separator } from "@components/ui/separator";
import Link from "next/link";

const IssueCard: React.FC = () => {
  return (
    <Link href="/" className="flex flex-row justify-between items-center p-2 hover:bg-zinc-800 rounded-md">
      <div>
        <h3>Issue 1</h3>
        <div className="flex items-center flex-row text-xs text-base-100 gap-1">
          <p>PJT-1</p>
          <Separator className="w-1" />
          <p>Project 1</p>
        </div>
      </div>
      
      <p className="text-xs text-base-100">In Progress</p>
    </Link>
  );
};

export default IssueCard;