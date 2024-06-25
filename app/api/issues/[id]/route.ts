import {
  resKey,
  responseOK,
  responseError,
} from "@http";
import { verifyCookie } from "@auth";
import { getIssueByProjectId, updateIssueSprintId } from "@db/issues";
import { TDragUpdate } from "@server/types";

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


export const PUT = async (req: Request) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);

  const body: TDragUpdate = await req.json();
  try {
    await updateIssueSprintId(body);
    return responseOK(body, 200, resKey.operation);
  } catch (error) {
    return responseError(500);
  }
};