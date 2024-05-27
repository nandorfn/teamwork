import { NextResponse } from "next/server";
import { getSprintDropdown } from "../../../db/sprint";
import { ResponseErrorJSON, ResponseJSON, httpMetaMessages } from "@http";

export const GET = async (req: Request, { params }: {
  params: {
    id: number
  }
}) => {
  try {
    const sprints = await getSprintDropdown(Number(params?.id));

    return NextResponse.json(ResponseJSON(
      sprints,
      200,
      httpMetaMessages[200].found
    ), { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(ResponseErrorJSON(
      { server: httpMetaMessages[404].notExist }, 404, httpMetaMessages[404].notExist),
      { status: 404 }
    );
  }
};