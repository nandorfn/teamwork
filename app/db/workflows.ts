import prisma from "@lib/prisma";

export const getWorkflowsDB = async (userId: string, projectId: string | number) => {
  const res = await prisma.workflow.findMany({
    where: {
      project: {
        memberships: {
          some: {
            userId: Number(userId)
          }
        }
      },
      projectId: Number(projectId)
    },
    select: {
      id: true,
      name: true
    }
  });
  
  const formatted = res?.map((item) => ({
    value: String(item?.id),
    label: item.name
  }));
  
  return formatted;
};