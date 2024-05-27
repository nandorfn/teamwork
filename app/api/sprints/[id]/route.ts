import { getSprintDropdown } from "@db/sprint";
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