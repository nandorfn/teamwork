import { Skeleton } from "@components/ui/skeleton";

const CommentSkeleton: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 w-[80%]">
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    </div>
  );
};

export default CommentSkeleton;