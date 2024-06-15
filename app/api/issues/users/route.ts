import { verifyCookie } from "@auth";
import { getIssueByAssigneeID } from "@db/issues";
import { resKey, responseError, responseOK } from "@http";

export const GET = async (req: Request) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);
  
  try {
    const res = await getIssueByAssigneeID(verifiedToken.id);
    return responseOK(res, 200, "found");
  } catch (error) {
    responseError(500);
  }
};