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

export const getAllWorkflows = async (projectId: number) => {
  const workflows = await prisma.workflow.findMany({
      where: {
          projectId: projectId,
      },
      select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          project: {
              select: {
                  issues: {
                    select: {
                      id: true,
                      summary: true,
                      description: true,
                      statusId: true,
                      assigneeId: true,
                      reporterId: true,
                      projectId: true,
                      type: true,
                      assignee: {
                        select: {
                          id: true,
                          name: true,
                          avatar: true,
                          color: true,
                        }
                      },
                      color: true,
                      row: true,
                      sprintId: true,
                      parentId: true,
                      createdAt: true,
                      updatedAt: true,
                      sprint: {
                        select: {
                          status: true,
                        }
                      }
                    }
                  }
              },
          },
      },
  });

  const workflowsWithFilteredIssues = workflows.map(workflow => ({
    ...workflow,
    project: {
      issues: workflow.project.issues
        .filter(issue => issue.statusId === workflow.id) 
        .filter(issue => issue.sprint?.status !== "complete")
        .filter(issue => issue.type !== "Epic")
    },
  }));

  return workflowsWithFilteredIssues;
};

