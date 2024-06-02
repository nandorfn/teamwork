import { verifyCookie } from "@auth";
import { resKey, responseError, responseOK } from "@http";
import prisma from "@lib/prisma";
import { TStartSprint, startSprintSchema } from "@schemas/sprintSchemas";
import { TStartSprintServer } from "@server/types";
import { ZodIssue } from "zod";

export const PUT = async (req: Request, { params }: {
  params: {
    id: string,
    sprintId: string
  }
}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);  
  const body: TStartSprintServer = await req.json();
  const result = startSprintSchema.safeParse(body);
  const { data, success, error } = result;
  let zodErrors = {};

  if (!success) {
    error.issues.forEach((issue: ZodIssue) => {
      zodErrors = {
        ...zodErrors,
        [issue.path[0]]: issue.message
      };
    });
    return responseError(400);
  }
  if (!data) return responseError(400);
  try {
    const res = await prisma.sprint.update({
      where: {
        id: Number(params.sprintId),
        projectId: Number(params.id)
      },
      data: {
        status: "progress",
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate
      }
    });
    
    return responseOK(res, 200, "update");
  } catch (error) {
    return responseError(500);
  }
};