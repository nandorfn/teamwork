import { verifyCookie } from "@auth";
import { resKey, responseError, responseOK } from "@http";

export const GET = async (req: Request) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401);

  const data = {
    id: verifiedToken.id,
    username: verifiedToken.username
  };

  return responseOK(data, 200, resKey.success);
};