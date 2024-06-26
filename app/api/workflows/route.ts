import { verifyCookie } from "@auth";
import { getAllWorkflows } from "@db/workflows";
import { resKey, responseError, responseOK } from "@http";

export const GET = async (req: Request, { params }: { params: { id: number } }) => {
  console.log("Request received:", req);
  
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) {
    console.log("Token verification failed");
    return responseError(401, resKey.denied);
  }

  console.log("Token verified:", verifiedToken);
  console.log("Params:", params);

  try {
    const res = await getAllWorkflows(Number(params.id));
    console.log("Workflow data:", res);
    return responseOK(res, 200, resKey.success);
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return responseError(500);
  }
};
