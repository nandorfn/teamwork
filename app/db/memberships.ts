import prisma from "@lib/prisma";

export const getAllProjects = async (userId: number) => {
  const projectsByMember = await prisma.membership.findMany({
    where: {
      userId: userId,
    },
  });
  
  console.log(projectsByMember)
}