import { verifyCookie } from "@auth";
import { createComment } from "@db/comments";
import { resKey, responseError, responseOK } from "@http";
import { commentServer } from "@schemas/commentSchema";
import { ZodIssue } from "zod";

export const POST = async (req: Request) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);
  
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
    const res = await createComment({
      userId: verifiedToken.id,
      projectId: data.projectId,
      issueId: data.issueId,
      text: data.text
    });
    return responseOK(res, 201, resKey.success);
  } catch (error) {
    return responseError(500);
  }
};