import {
  resKey,
  responseOK,
  responseError,
} from "@http";
import { verifyCookie } from "@auth";
import { getIssueParentDropdown } from "@db/issues";

export const GET = async (req: Request, { params }: {
  params: {
    id: number,
    type: string,
  }
}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);
  try {
    const issue = await getIssueParentDropdown(Number(params?.id), params?.type);
    return responseOK(issue, 200, resKey.found);
  } catch (error) {
    return responseError(500);
  }
};
