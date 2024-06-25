import { verifyCookie } from "@auth";
import { deleteComment, updateComment } from "@db/comments";
import { resKey, responseError, responseOK } from "@http";
import { commentServer } from "@schemas/commentSchema";
import { ZodIssue } from "zod";

export const DELETE = async (req: Request, {
  params
}: {
  params: {
    issueId: string,
    id: string
  }
}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);

  const { issueId, id } = params;
  if (!issueId || !id ) return responseError(400);

  try {
    const res = await deleteComment(
        Number(issueId),
        Number(id)
    );

    return responseOK(res, 200, resKey.operation);
  } catch (error) {
    return responseError(500);
  }
};

export const PUT = async (req: Request, {
  params
}: {
  params: {
    issueId: string,
    id: string
  }
}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);
  
  const { issueId, id } = params;
  if (!issueId || !id ) return responseError(400);

  const body: unknown = await req.json();
  const result = commentServer.safeParse(body);
  const { data, success, error } = result;
  let zodErrors = {};

  if (!success) {
    error.issues.forEach((issue: ZodIssue) => {
      zodErrors = {
        ...zodErrors,
        [issue.path[0]]: issue.message
      };
    });
    return responseError(400);
  }

  if (!data) return responseError(400);

  try {
    const res = await updateComment({
      issueId: Number(issueId),
      projectId: Number(data?.projectId),
      commentId: Number(id),
      text: data?.text,
    });

    return responseOK(res, 200, resKey.operation);
  } catch (error) {
    return responseError(500);
  }
};