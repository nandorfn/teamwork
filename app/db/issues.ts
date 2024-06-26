import { parseNumber } from "@func";
import prisma from "@lib/prisma";
import { TEditIssueForm, TIssueServer } from "@schemas/issueSchemas";
import { SprintMapValue, TDragUpdate, TEditDetail } from "@server/types";

export const getIssueParentDropdown = async (projectId: number, type: string) => {
    const res = await prisma.issue.findMany({
        where: {
            projectId: projectId,
            type: type
        },
        select: {
            id: true,
            summary: true,
        }
    });

    const formatted = res?.map((item) => ({
        value: String(item?.id),
        label: item.summary
    }));
    return formatted;
};

export const getIssueByProjectId = async (projectId: number, userId: number): Promise<SprintMapValue[]> => {
    const sprints = await prisma.sprint.findMany({
        where: {
            projectId: projectId,
            project: {
                memberships: {
                    some: {
                        userId: userId,
                    }
                }
            },
            status: {
                not: "complete"
            }
        },
        include: {
            issues: {
                where: {
                    type: {
                        not: "Epic"
                    },
                    sprint: {
                        status: {
                            not: "complete"
                        }
                    }
                },
                include: {
                    workflowStatus: true,
                    parent: {
                        select: {
                            summary: true,
                        }
                    },
                    assignee: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            color: true
                        }
                    },
                    reporter: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            color: true
                        }
                    }
                }
            },
        },
        orderBy: {
            updatedAt: "desc"
        }
    });
    const sprintMap: Map<string, SprintMapValue> = new Map();
    sprints.forEach(sprint => {
        const formattedSprint: SprintMapValue = {
            id: sprint.id.toString(),
            title: sprint.name,
            startDate: sprint.startDate ?? "",
            endDate: sprint.endDate ?? "",
            status: sprint.status ?? "",
            data: sprint.issues.map(issue => ({
                id: issue.id.toString(),
                type: issue.type || null,
                text: issue.summary || null,
                status: issue.workflowStatus?.name,
                statusId: String(issue.workflowStatus.id),
                description: issue?.description,
                assignee: issue?.assignee,
                reporter: issue?.reporter,
                parent: {
                    name: issue.parent?.summary ?? "",
                    color: issue.color || "default"
                }
            }))
        };

        sprintMap.set(sprint.id.toString(), formattedSprint);
    });

    const backlogIssues = await prisma.issue.findMany({
        where: {
            projectId: projectId,
            sprintId: null,
            type: {
                not: "Epic"
            },
            project: {
                memberships: {
                    some: {
                        userId: userId,
                    }
                }
            }
        },
        include: {
            workflowStatus: true,
            parent: {
                select: {
                    summary: true,
                }
            },
            assignee: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                    color: true
                }
            },
            reporter: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                    color: true
                }
            }
        }
    });

    const backlogData = backlogIssues.map(issue => ({
        id: issue.id.toString(),
        type: issue.type || null,
        text: issue.summary || null,
        status: issue.workflowStatus?.name,
        statusId: String(issue.workflowStatus.id),
        description: issue?.description,
        assignee: issue?.assignee,
        reporter: issue?.reporter,
        parent: {
            name: issue.parent?.summary ?? "",
            color: issue.color || "default"
        }
    }));

    if (!sprintMap.has("backlog")) {
        sprintMap.set("backlog", {
            id: "backlog",
            title: "Backlog",
            startDate: "",
            endDate: "",
            status: "backlog",
            data: backlogData
        });
    } else {
        const backlogSprint = sprintMap.get("backlog");
        if (backlogSprint) {
            backlogSprint.data.push(...backlogData);
            sprintMap.set("backlog", backlogSprint);
        }
    }
    return Array.from(sprintMap.values());
};



export const createIssue = async (data: TIssueServer) => {
    const issueBySprint = await prisma.issue.findMany({
        where: {
            sprintId: parseNumber(data?.sprint),
        }
    });
    return await prisma.issue.create({
        data: {
            summary: data?.summary,
            description: data?.description ?? "",
            statusId: Number(data?.status),
            assigneeId: parseNumber(data?.assigneeIssue),
            reporterId: parseNumber(data?.reporter),
            projectId: Number(data?.projectId),
            type: data?.issueType ?? "",
            row: issueBySprint?.length ?? 0,
            color: "",
            sprintId: parseNumber(data?.sprint),
            parentId: parseNumber(data?.parent),
        }
    });
};

export const getIssueByAssigneeID = async (userId: number) => {
    return await prisma.issue.findMany({
        where: {
            assigneeId: userId,
        },
        include: {
            project: {
                select: {
                    name: true,
                    key: true,
                }
            },
            workflowStatus: {
                select: {
                    name: true,
                }
            }
        }
    });
};

export const updateIssueSprintId = async (data: TDragUpdate) => {
    return await prisma.issue.update({
        where: {
            id: Number(data?.id)
        },
        data: {
            sprintId: Number(data?.dest)
        }
    });
};

export const getIssueBySprintID = async (sprintId: number, projectId: number) => {
    return await prisma.issue.findMany({
        where: {
            projectId: projectId,
            sprintId: sprintId,
        }
    });
};

export const updateIssue = async (id: number, data: TEditDetail) => {
    return await prisma.issue.update({
        where: {
            id: id,
        },
        data: {
            summary: data?.summary,
            statusId: data?.status,
            assigneeId: data?.assignee,
            description: data?.description
        }
    });
};

export const updateStatusIssue = async (id: number, statusId: number) => {
    return await prisma.issue.update({
        where: {
            id: id,
        },
        data: {
            statusId: statusId
        }
    });
};

export const deleteIssue = async (id: number) => {
    return await prisma.issue.delete({
        where: {
            id: id,
        }
    });
};