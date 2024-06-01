import prisma from "@lib/prisma";

export const getWorkflowsDB = async (userId: number, projectId: string | number) => {
  const res = await prisma.workflow.findMany({
    where: {
      project: {
        memberships: {
          some: {
            userId: userId
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