import { parseNumber } from "@func";
import prisma from "@lib/prisma";
import { TIssueServer } from "@schemas/issueSchemas";
import { SprintDataItem, SprintMapValue } from "@server/types";

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

export const getIssueByProjectId = async (projectId: number): Promise<SprintMapValue[]> => {
    const rawData = await prisma.issue.findMany({
        where: {
            projectId: projectId,
        },
        include: {
            sprint: {
                select: {
                    name: true,
                }
            },
        },
    });
    console.log(rawData);
        
    if (rawData?.length < 1) return [
        {
            id: "backlog",
            title: "Backlog",
            data: []
        }
    ];

    const sprintMap: Map<string, SprintMapValue> = new Map();

    rawData.forEach((item) => {
        let sprintName: string;
        let sprintTitle: string;

        if (item.sprint) {
            sprintName = item.sprint.name.toLowerCase().replace(/\s+/g, "");
            sprintTitle = item.sprint.name;
        } else {
            sprintName = "backlog";
            sprintTitle = "Backlog";
        }

        if (!sprintMap.has(sprintName)) {
            sprintMap.set(sprintName, {
                id: sprintName,
                title: sprintTitle,
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
    });
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