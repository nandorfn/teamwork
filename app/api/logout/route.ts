import {
  resKey,
  responseOK,
  responseError,
} from "@http";
import { cookies } from "next/headers";

export const GET = () => {
  try {
    cookies().delete("token");
    return responseOK([], 200, resKey.operation);
  } catch (error) {
    return responseError(500);
  }
};