import { verifyCookie } from "@auth";
import { completeSprint, createSprint, getSprintDropdown } from "@db/sprint";
import { resKey, responseError, responseOK } from "@http";
import { TCompleteSprint } from "@server/types";

export const GET = async (req: Request, { params }: {
  params: {
    id: number
  }
}) => {
  try {
    const sprints = await getSprintDropdown(Number(params?.id));
    return responseOK(sprints, 200, resKey.found);
  } catch (error) {
    return responseError(404, resKey.notExist);
  }
};

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);

  try {
    const res = await createSprint(Number(params.id), Number(verifiedToken.id));
    return responseOK(res, 201);
  } catch (error) {
    return responseError(500);
  }
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);

  const body: TCompleteSprint = await req.json();

  try {
    const res = await completeSprint(Number(params.id), body);
    return responseOK(res, 200, resKey.operation);
  } catch (error) {
    return responseError(500);
  }
};