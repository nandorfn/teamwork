import prisma from "@lib/prisma";
import { TCreateComment } from "@server/types";

export const createComment = async ({ userId, projectId, issueId, text }: TCreateComment) => {
  return await prisma.comment.create({
    data: {
      text: text,
      userId: userId,
      projectId: projectId,
      issueId: issueId,
    }
  });
};