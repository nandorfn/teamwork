import { verifyCookie } from "@auth";
import { NextResponse } from "next/server";
import { getIssueByProjectId } from "../../../db/issues";
import { ResponseJSON, httpMetaMessages } from "@http";

export const GET = async (req: Request, { params }: {
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

  const issue = await getIssueByProjectId(Number(params?.id));

  return NextResponse.json(
    ResponseJSON(
      issue,
      200,
      httpMetaMessages[200].found
    ), { status: 200 });
};
