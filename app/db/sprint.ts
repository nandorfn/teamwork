import prisma from "@lib/prisma";

export const getSprintDropdown = async (projectId: number) => {
  const res = await prisma.sprint.findMany({
    where: {
      projectId: projectId
    }
  });

  const formatted = res?.map((item) => ({
    value: String(item?.id),
    label: item?.name
  }));

  return formatted;
};

export const getTotalSprint = async (projectId: number, userId: number) => {
  return await prisma.sprint.count({
    where: {
      projectId: projectId,
      project: {
        memberships: {
          some: {
            userId: userId
          }
        }
      }
    }
  });
};

export const createSprint = async (projectId: number, userId: number) => {
  const totalSprint = await getTotalSprint(projectId, userId);
  const defaultValue = {
    name: `Sprint ${totalSprint + 1}`,
    projectId: projectId,
    status: "todo",
  };
  return await prisma.sprint.create({
    data: {
      name: defaultValue.name,
      projectId: defaultValue.projectId,
      status: defaultValue.status
    }
  });
};