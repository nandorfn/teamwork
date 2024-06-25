import {
  resKey,
  responseError,
  responseOK,
} from "@http";
import {
  getAllProjects,
  createProjectDB,
} from "@db/memberships";
import { ZodIssue } from "zod";
import { verifyCookie } from "@auth";
import { TProjectForm, projectSchema } from "@schemas/projectSchemas";

export const GET = async (req: Request) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);

  try {
    const result = await getAllProjects(verifiedToken?.id);
    return responseOK(result, 200, resKey.found);
  } catch (error) {
    return responseError(500);
  }
};

export const POST = async (req: Request) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);

  const body: TProjectForm = await req.json();
  if (!body) return responseError(400);

  const result = projectSchema.safeParse(body);
  if (!result.success) {
    let zodErrors = {};
    result.error.issues.forEach((issue: ZodIssue) => {
      zodErrors = {
        ...zodErrors,
        [issue.path[0]]: issue.message
      };
    });

    return responseError(400);
  }

  try {
    const data = await createProjectDB(body, verifiedToken);
    return responseOK(data, 201);
  } catch (error) {
    return responseError(500);
  }
};