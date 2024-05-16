import { NextResponse } from "next/server";
import { getAllProjects } from "../../db/memberships";
import { verifyCookie } from "../../utils/auth"
import { ResponseJSON } from "../../utils/http";

export const GET = async (req: Request) => {
  const token = req.headers.get('cookie');
  const verifiedToken = token && (await verifyCookie(token));
  
  if (!verifiedToken) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  }
  const result = await getAllProjects(verifiedToken?.id);
  return NextResponse.json(ResponseJSON(result, 200, 'OK'), { status: 200 });
}