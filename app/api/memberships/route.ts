import { NextResponse } from "next/server";
import { createProjectDB, getAllProjects } from "../../db/memberships";
import { verifyCookie } from "../../utils/auth";
import { ResponseErrorJSON, ResponseJSON, httpMetaMessages } from "../../utils/http";
import { TProjectForm, projectSchema } from "@schemas/projectSchemas";
import { ZodIssue } from "zod";

export const GET = async (req: Request) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) {
    return NextResponse.json({ errors: httpMetaMessages[401].denied }, { status: 401 });
  }

  const result = await getAllProjects(verifiedToken?.id);
  return NextResponse.json(
    ResponseJSON(
      result,
      200,
      httpMetaMessages[200].found
    ), { status: 200 }
  );
};

export const POST = async (req: Request, res: Response) => {
  const verifiedToken = await verifyCookie(req);

  if (!verifiedToken) {
    return NextResponse.json(ResponseErrorJSON(
      httpMetaMessages[401].denied,
      401,
      httpMetaMessages[401].denied
    ), { status: 401 });
  }

  const body: TProjectForm = await req.json();
  if (!body) {
    return NextResponse.json(
      ResponseErrorJSON(
        httpMetaMessages[400],
        400,
        httpMetaMessages[400]
      ), { status: 400 });
  }

  const result = projectSchema.safeParse(body);
  if (!result.success) {
    let zodErrors = {};
    result.error.issues.forEach((issue: ZodIssue) => {
      zodErrors = {
        ...zodErrors,
        [issue.path[0]]: issue.message
      };
    });

    return NextResponse.json(ResponseErrorJSON(
      zodErrors,
      400,
      httpMetaMessages[400]
    ), { status: 400 });
  }

  try {
    const data = await createProjectDB(body, verifiedToken);
    return NextResponse.json(
      ResponseJSON(
        data,
        201,
        httpMetaMessages[201]
      ), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      ResponseErrorJSON(
        [],
        500,
        httpMetaMessages[500]
      ), { status: 500 });
  }
};