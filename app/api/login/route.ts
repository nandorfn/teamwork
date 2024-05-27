import {
  resKey,
  responseOK,
  responseError,
} from "@http";
import prisma from "@lib/prisma";
let bcrypt = require("bcryptjs");
import { applyJWT } from "@auth";
import { loginSchema } from "@schemas/authSchemas";

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
    return responseError(400);
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