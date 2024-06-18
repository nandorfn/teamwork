import { verifyCookie } from "@auth";
import { getCommentByIssue } from "@db/comments";
import { resKey, responseError, responseOK } from "@http";
import { NextRequest } from "next/server";

export const GET = async ( req: NextRequest, {params}: { params: { issueId: string}} ) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);

  const searchParams = req.nextUrl.searchParams;
  const orderBy = searchParams.get("orderBy");
  if (!params.issueId) return responseError(400);
  
  try {
    const res = await getCommentByIssue({ 
      issueId: Number(params?.issueId), 
      userId: verifiedToken.id,
      orderBy: orderBy
    });
    
    return responseOK(res, 200, resKey.found);
  } catch (error) {
    return responseError(500);
  }
  
};