import { verifyCookie } from "@auth";
import { createSprint, getSprintDropdown } from "@db/sprint";
import { resKey, responseError, responseOK } from "@http";

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