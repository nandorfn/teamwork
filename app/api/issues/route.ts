import {
  resKey,
  responseOK,
  responseError,
} from "@http";
import { ZodIssue } from "zod";
import { verifyCookie } from "@auth";
import { createIssue } from "@db/issues";
import { issueServer } from "@schemas/issueSchemas";

export const POST = async (req: Request) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);

  const body: unknown = await req.json();
  const result = issueServer.safeParse(body);
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
    const res = await createIssue(data);
    return responseOK(res, 201);
  } catch (error) {
    return responseError(500);
  }
};

