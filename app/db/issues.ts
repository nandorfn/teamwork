import { parseNumber } from "@func";
import prisma from "@lib/prisma";
import { TIssueServer } from "@schemas/issueSchemas";
import { SprintDataItem, SprintMapValue } from "@server/types";

export const getIssueByProjectId = async (projectId: number): Promise<SprintMapValue[]> => {
    const rawData = await prisma.issue.findMany({
        where: {
            projectId: projectId
        },
        include: {
            sprint: {
                select: {
                    name: true,
                }
            }
        },
    });

    const sprintMap: Map<string, SprintMapValue> = new Map();
    rawData.forEach((item) => {
        if (item.sprint) {
            const sprintName: string = item.sprint.name.toLowerCase().replace(/\s+/g, "");
            if (!sprintMap.has(sprintName)) {
                sprintMap.set(sprintName, {
                    id: sprintName,
                    title: item.sprint.name,
                    data: []
                });
            }

            const sprintData: SprintDataItem[] | undefined = sprintMap.get(sprintName)?.data;
            sprintData?.push({
                id: item.id.toString(),
                type: item.type || null,
                text: item.summary || null,
                parent: {
                    name: "Feature 1",
                    color: item.color || "default"
                }
            });
        }
    });

    return Array.from(sprintMap.values());
};

export const createIssue = async (data: TIssueServer) => {
    const issueBySprint = await prisma.issue.findMany({
        where: {
            sprintId: parseNumber(data?.sprint),
        }
    });
    console.log(issueBySprint);
    // return await prisma.issue.create({
    //     data: {
    //         summary: data?.summary,
    //         description: data?.description ?? "",
    //         statusId: Number(data?.status),
    //         assigneeId: parseNumber(data?.assigneeIssue),
    //         reporterId: parseNumber(data?.reporter),
    //         projectId: Number(data?.projectId),
    //         type: data?.issueType ?? "",
    //         // row: issueBySprint?.length ?? 0,
    //         color: "",
    //         sprintId: parseNumber(data?.sprint),
    //         parentId: parseNumber(data?.parent),
    //     }
    // });
};