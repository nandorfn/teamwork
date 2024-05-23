import prisma from '@lib/prisma'

export const getIssueByProjectId = async (projectId: number) => {
  return await prisma.issue.findMany({
    where: {
      projectId: projectId
    }
  })
}