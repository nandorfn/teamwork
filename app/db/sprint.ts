import prisma from "@lib/prisma"

export const getSprintDropdown = async (projectId: number) => {
  const res = await prisma.sprint.findMany({
    where: {
      projectId: projectId
    }
  })
    
  const formatted = res?.map((item) => ({
    value: String(item?.id),
    label: item?.name
  }))
  
  return formatted;
}