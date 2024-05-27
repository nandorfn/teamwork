import { verifyCookie } from "@auth";
import { issueServer } from "@schemas/issueSchemas";
import { NextResponse } from "next/server";
import { createIssue } from "../../db/issues";
import { ZodIssue } from "zod";
import { ResponseJSON, httpMetaMessages } from "@http";

export const POST = async (req: Request, { params }: {
  params: {
    id: number
  }
}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) {
    return NextResponse.json({
      errors: httpMetaMessages[401].denied
    }, { status: 401 });
  }

  const body: any = await req.json();
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

    return NextResponse.json({ errors: zodErrors }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ errors: httpMetaMessages[400] }, { status: 400 });
  }

  try {
    const res = await createIssue(data);
    return NextResponse.json(
      ResponseJSON(
        res,
        200,
        httpMetaMessages[201]
      ), { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({
      errors: httpMetaMessages[500]
    }, { status: 500 }
    );
  }
};