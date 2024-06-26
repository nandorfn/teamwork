import { verifyCookie } from "@auth";
import { getWorkflowsDB } from "@db/workflows";
import { resKey, responseError, responseOK } from "@http";

export const GET = async (req: Request, { params }: {
  params: {
    id: number
  }
}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);
  
  try {
    const res = await getWorkflowsDB(verifiedToken?.id, params?.id);
    return responseOK(res, 200, resKey.found);
  } catch (error) { 
    return responseError(500);
  }
};