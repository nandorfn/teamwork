import {
  resKey,
  responseOK,
  responseError,
  getHttpMetaMessage,
  ResponseErrorJSON,
} from "@http";
import prisma from "@lib/prisma";
let bcrypt = require("bcryptjs");
import { applyJWT } from "@auth";
import { loginSchema } from "@schemas/authSchemas";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body: unknown = await req.json();
  const result = loginSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = {
        ...zodErrors,
        [issue.path[0]]: issue.message
      };
    });
    const message = getHttpMetaMessage(400, "");
    return NextResponse.json(
      ResponseErrorJSON(
        zodErrors,
        400,
        message
      ), { status: 400 }
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    }
  });

  if (!user) return responseError(404, resKey.userNotFound);
  const checkPass = bcrypt.compareSync(
    result.data.password,
    user.password
  );

  if (!checkPass) return responseError(404, resKey.invalidPass);
  try {
    applyJWT(user);
    return responseOK([], 200, resKey.operation);
  } catch (error) {
    return responseError(500);
  }
};