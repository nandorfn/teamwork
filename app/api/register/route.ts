import {
  resKey,
  responseOK,
  responseError,
  ResponseErrorJSON,
  getHttpMetaMessage,
} from "@http";
import { ZodIssue } from "zod";
import prisma from "@lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { TRegisterServer } from "@schemas/authSchemas";

export const POST = async (req: Request) => {
  const body: unknown = await req.json();
  const result = TRegisterServer.safeParse(body);
  const id = uuidv4();

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue: ZodIssue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    const message = getHttpMetaMessage(400, "");
    return NextResponse.json(
      ResponseErrorJSON(
        zodErrors,
        400,
        message
      ), { status: 400 }
    );
  };

  const existingEmail = await prisma.user.findFirst({
    where: {
      email: result.data.email
    }
  });
  if (existingEmail) return responseError(409, resKey.email);
  
  const randomColors = ["red", "green", "blue", "yellow", "slate", "orange", "amber", "lime", "emerald", "cyan", "sky", "indigo", "purple", "rose"];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * randomColors.length);
    return `bg-${randomColors[randomIndex]}-400`;
  };
  
  try {
    await prisma.user.create({
      data: {
        userId: id,
        color: getRandomColor(),
        name: result.data.name,
        avatar: "",
        email: result.data.email,
        salt: result.data.salt,
        password: result.data.password,
      }
    });
    return responseOK([], 201);
  } catch (error) {
    return responseError(500);
  }
};