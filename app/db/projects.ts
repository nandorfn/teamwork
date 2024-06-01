import prisma from "@lib/prisma";

export const getProjectByID = async (userId: number, projectId: number) => {
  return await prisma.project.findFirst({
    where: {
      id: projectId,
      memberships: {
        some: {
          userId: userId, 
        }
      }
    }
  });
};