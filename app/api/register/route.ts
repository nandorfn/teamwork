import { ResponseErrorJSON, ResponseJSON, httpMetaMessages } from "@http";
import prisma from "@lib/prisma";
import { TRegisterServer } from "@schemas/authSchemas";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ZodIssue } from "zod";

export const POST = async (req: Request) => {
  const body: any = await req.json();
  const result = TRegisterServer.safeParse(body);
  const id = uuidv4();

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue: ZodIssue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return NextResponse.json(
      ResponseErrorJSON(
        zodErrors,
        400,
        httpMetaMessages[400]
      ), { status: 400 }
    );
  };

  const existingEmail = await prisma.user.findFirst({
    where: {
      email: result.data.email
    }
  });

  if (existingEmail) {
    return NextResponse.json(ResponseErrorJSON(
      { email: "Email is already registered!" }, 400, httpMetaMessages[400]),
      { status: 400 }
    );
  }

  try {
    await prisma.user.create({
      data: {
        userId: id,
        name: result.data.name,
        avatar: "",
        email: result.data.email,
        salt: result.data.salt,
        password: result.data.password,
      }
    });

    return NextResponse.json(
      ResponseJSON([], 201, httpMetaMessages[201]),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(ResponseErrorJSON(
      { server: httpMetaMessages[500] }, 500, httpMetaMessages[500]),
      { status: 500 }
    );
  }
};