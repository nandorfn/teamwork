import prisma from "@lib/prisma";
import { TCreateComment, TUpdateComment } from "@server/types";

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

export const deleteComment = async (issueId: number, commentId: number) => {
  return await prisma.comment.delete({
    where: {
      id: commentId,
      issueId: issueId
    }
  });
};
export const updateComment = async ({ issueId, commentId, projectId, text }: TUpdateComment) => {
  return await prisma.comment.update({
    where: {
      id: commentId,
      issueId: issueId,
      projectId: projectId,
    },
    data: {
      text: text
    }
  });
};

export const getCommentByIssue = async ({
  issueId,
  userId,
  orderBy
}: {
  issueId: number,
  userId: number,
  orderBy: any,
}) => {
  return await prisma.comment.findMany({
    where: {
      issueId: issueId,
      userId: userId
    },
    include: {
      user: {
        select: {
          avatar: true,
          name: true,
        }
      }
    },
    orderBy: {
      createdAt: orderBy,
    }
  });
};