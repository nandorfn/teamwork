import { NextResponse } from "next/server";

export const httpMetaMessages = {
  401: {
    signIn: 'Please sign in to access this page.',
    denied: 'Access denied. Please log in with the appropriate account.',
    expired: 'Your session has expired. Please log in again to continue.'
  },
  404: {
    notFound: 'The requested data was not found.',
    notExist: 'The requested data does not exist in our system.',
    page: 'Sorry, the page you are looking for could not be found.'
  },
  200: {
    success: 'Request successfully processed.',
    found: 'Data successfully found and sent.',
    operation: 'Operation has been successfully completed.'
  },
  201: 'Request successful. Data has been successfully created.',
  400: 'Invalid request. Please check the data you provided.',
  500: 'An internal server error occurred. Please try again later.',
  403: 'You are not allowed to access this resource. Please contact the administrator to obtain the necessary access.'
}

export const ResponseJSON = (data: any, code: number, msg: string) => {
  return {
    meta: {
      code: code ? code : 404,
      message: msg ? msg : httpMetaMessages[404].notExist
    },
    data: data ? data : [],
  }
}
export const ResponseErrorJSON = (errors: any, code: number, msg: string) => {
  return {
    meta: {
      code: code ? code : 500,
      message: msg ? msg : httpMetaMessages[500]
    },
    errors: errors ? errors : [],
  }
}


export const fetchData = async (url: string) => {
  const res = await fetch(url);
  return res.json();
}

export const queryDB = async (cb: any) => {
  try {
    const res = await cb();
    return NextResponse.json({ res }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ errors: httpMetaMessages[500] }, { status: 500 });
  }
}