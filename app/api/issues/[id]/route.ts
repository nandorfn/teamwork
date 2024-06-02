import {
  resKey,
  responseOK,
  responseError,
} from "@http";
import { verifyCookie } from "@auth";
import { getIssueByProjectId } from "@db/issues";

export const GET = async (req: Request, { params }: {
  params: {
    id: number,
  }
}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);
  try {
    const issue = await getIssueByProjectId(Number(params?.id), verifiedToken.id);
    return responseOK(issue, 200, resKey.found);
  } catch (error) {
    return responseError(500);
  }
};
