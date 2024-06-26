/*
  Warnings:

  - Added the required column `projectId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `row` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "row" INTEGER NOT NULL,
ALTER COLUMN "assigneeId" DROP NOT NULL,
ALTER COLUMN "reporterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sprint" ADD COLUMN     "goal" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "color" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
