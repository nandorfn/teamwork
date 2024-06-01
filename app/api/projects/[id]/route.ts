import { verifyCookie } from "@auth";
import { getProjectByID } from "@db/projects";
import { resKey, responseError, responseOK } from "@http";

export const GET = async (req: Request, { params }: {
  params: {
    id: number
  }
}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);

  try {
    const res = await getProjectByID(verifiedToken.id, Number(params.id));

    return responseOK(res, 200);
  } catch (error) {
    return responseError(500);
  }
};