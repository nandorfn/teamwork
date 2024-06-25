import prisma from "@lib/prisma";
import { JwtSchema } from "@schemas/authSchemas";

export const getAllProjects = async (userId: number) => {  
  const projects = await prisma.project.findMany({
    where: {
      memberships: {
        some: {
          userId: userId,
        },
      },
    },
  });
  
  return projects;
};

export const createProjectDB = async (body: any, verifiedToken: JwtSchema) => {
    return await prisma.$transaction(async (prisma) => {
      const newProject = await prisma.project.create({
        data: {
          name: body?.name,
          key: body?.key,
        }
      });
      
      const newMember = await prisma.membership.create({
        data: {
          userId: verifiedToken?.id,
          projectId: newProject.id,
        }
      });
      
      await prisma.workflow.createMany({
        data: [
          {
            name: "Todo",
            projectId: newProject?.id
          },
          {
            name: "In Progress",
            projectId: newProject?.id
          },
          {
            name: "Done",
            projectId: newProject?.id
          },
        ]
      });
      
      return newMember;
    });
};

export const addNewMember = async (userId: number, projectId: number) => {
  return await prisma.membership.create({
    data: {
      userId: userId,
      projectId: projectId
    }
  });
};