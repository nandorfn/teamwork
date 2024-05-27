import { verifyCookie } from "@auth";
import { NextResponse } from "next/server";
import { getWorkflowsDB } from "../../../db/workflows";
import { ResponseErrorJSON, ResponseJSON, httpMetaMessages } from "@http";

export const GET = async (req: Request, { params }: {
  params: {
    id: number
  }
}) => {
  const verifiedToken = await verifyCookie(req);

  if (!verifiedToken) {
    return NextResponse.json(ResponseErrorJSON(
      { server: httpMetaMessages[401].denied },
      401,
      httpMetaMessages[401].denied
    ), { status: 401 }
    );
  }

  const res = await getWorkflowsDB(verifiedToken?.userId, params?.id);

  return NextResponse.json(ResponseJSON(
    res,
    200,
    httpMetaMessages[200].found
  ), { status: 200 }
  );
};