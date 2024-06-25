import prisma from "@lib/prisma";
import { getIssueBySprintID } from "./issues";
import { TCompleteSprint } from "@server/types";

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

export const deleteSprint = async (projectId: number, id: number) => {
  await prisma.$transaction(
    [
      prisma.sprint.delete({
        where: {
          id: id
        }
      }),
      prisma.issue.updateMany({
        where: {
          sprintId: id
        },
        data: {
          sprintId: null
        }
      })
    ]
  );
};

export const completeSprint = async (projectId: number, data: TCompleteSprint) => {
  return await prisma.$transaction(
    [
      prisma.issue.updateMany({
        where: {
          id: {
            in: data?.data
          }
        },
        data: {
          sprintId: null
        }
      }),
      prisma.sprint.update({
        where: {
          id: data?.id
        },
        data: {
          status: "complete"
        }
      }),
    ]
  );
};