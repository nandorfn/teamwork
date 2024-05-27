import { httpMetaMessages } from "@http";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export const GET = () => {
  cookies().delete("token");
  return NextResponse.json(httpMetaMessages[200].operation, { status: 200});
};