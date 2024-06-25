import prisma from "@lib/prisma";
import { resKey, responseError, responseOK } from "@http";

export const GET = async () => {
  try {
    const projects = await prisma.project.findMany();
    return responseOK(projects, 200, resKey.found);
  } catch (error) {
    return responseError(500);
  }
};