import { HttpMetaMessage, HttpStatusCodes } from "@server/types";
import { NextResponse } from "next/server";

export const resKey = {
  signIn: "signIn",
  denied: "denied",
  expired: "expired",
  notFound: "notFound",
  userNotFound: "userNotFound",
  invalidPass: "invalidPass",
  notExist: "notExist",
  page: "page",
  email: "email",
  success: "success",
  found: "found",
  operation: "operation",
};

export const httpMetaMessages: Record<HttpStatusCodes, HttpMetaMessage | string> = {
  401: {
    signIn: "Please sign in to access this page.",
    denied: "Access denied. Please log in with the appropriate account.",
    expired: "Your session has expired. Please log in again to continue."
  },
  404: {
    notFound: "The requested data was not found.",
    userNotFound: "User not found.",
    invalidPass: "Your password is invalid.",
    notExist: "The requested data does not exist in our system.",
    page: "Sorry, the page you are looking for could not be found."
  },
  409: {
    email: "Email is already registered!",
  },
  200: {
    success: "Request successfully processed.",
    found: "Data successfully found and sent.",
    operation: "Operation has been successfully completed."
  },
  201: "Request successful. Data has been successfully created.",
  400: "Invalid request. Please check the data you provided.",
  500: "An internal server error occurred. Please try again later.",
  403: "You are not allowed to access this resource. Please contact the administrator to obtain the necessary access."
};

export const api = {
  register: "/api/register",
  login: "/api/login",
};

export const ResponseJSON = (data: any, code: number, msg: string) => {
  return {
    meta: {
      code: code,
      message: msg
    },
    data: data ? data : [],
  };
};
export const ResponseErrorJSON = (errors: any, code: number, msg: string) => {
  return {
    meta: {
      code: code ? code : 500,
      message: msg ? msg : httpMetaMessages[500]
    },
    errors: errors ? errors : [],
  };
};


export const fetchData = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const queryDB = async (cb: any) => {
  try {
    const res = await cb();
    return NextResponse.json({ res }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ errors: httpMetaMessages[500] }, { status: 500 });
  }
};

export const getHttpMetaMessage = (code: HttpStatusCodes, key?: string): string => {
  const message = httpMetaMessages[code];
  if (typeof message === "string") {
    return message;
  } else if (key && message[key]) {
    return message[key];
  } else {
    return "Unknown status code or message key";
  }
};

export const responseOK = (data: any, code: HttpStatusCodes, key?: string) => {
  const message = getHttpMetaMessage(code, key);
  return NextResponse.json(
    ResponseJSON(
      data,
      code,
      message
    ), { status: code });
};

export const responseError = (code: HttpStatusCodes, key?: string) => {
  const message = getHttpMetaMessage(code, key);
  return NextResponse.json(
    ResponseErrorJSON(
      { server: httpMetaMessages[code] },
      code,
      message
    ), { status: code }
  );
};