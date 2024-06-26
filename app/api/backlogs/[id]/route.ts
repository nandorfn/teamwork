import { verifyCookie } from "@auth";
import { updateIssue, updateStatusIssue } from "@db/issues";
import { resKey, responseError, responseOK } from "@http";
import { TEditDetail } from "@server/types";

export const PATCH = async (req: Request, { params }: { params: { id: string }}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);
  
  const body: unknown = await req.json();
  if (!body) return responseError(400);
  
  try {
    const res = await updateStatusIssue(Number(params?.id), Number(body));
    return responseOK(res, 200, resKey.operation);
  } catch (error) {
    return responseError(500);
  }
};
export const PUT = async (req: Request, { params }: { params: { id: string }}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);
  
  const body: TEditDetail = await req.json();
  if (!body) return responseError(400);
  
  try {
    const res = await updateIssue(Number(params?.id), body);
    return responseOK(res, 200, resKey.operation);
  } catch (error) {
    return responseError(500);
  }
};

