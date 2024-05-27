import { ResponseJSON, httpMetaMessages } from "@http";
import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const projects = await prisma.project.findMany();
  return NextResponse.json(
    ResponseJSON(
      projects,
      200,
      httpMetaMessages[200].found
    ), { status: 200 }
  );
};