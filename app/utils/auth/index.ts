import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { JwtSchema } from "@schemas/authSchemas";
import { TUser } from "@server/types";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));

  if (!verified) {
    return undefined;
  } else {
    return verified.payload as JwtSchema;
  }
};

export const checkUserLogin = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const user: JwtSchema | undefined = token && (await verifyAuth(token.value));

  return user;
};

export const verifyCookie = async (req: Request) => {
  const cookie = req.headers.get("cookie");
  if (cookie) {
    const cookies = cookie?.split(";");
    const tokenString = cookies?.find(str => str.startsWith("token="));
    const token = tokenString?.split("=")[1];
    const verifiedToken = token && (await verifyAuth(token));
    return verifiedToken;
  }
};

export const applyJWT = (user: TUser) => {
  const token = jwt.sign({
    username: user.name,
    userId: user.userId,
    id: user.id
  },
    JWT_SECRET!, {
    expiresIn: "30d"
  });
  
  cookies().set("token", token, {
    secure: process.env.NODE_ENV !== "development",
    maxAge: 2592000,
    sameSite: "strict"
  });
};