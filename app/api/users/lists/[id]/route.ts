import { responseOK } from "@http";
import prisma from "@lib/prisma";

export const GET =  async (req: Request, { params}: {params: {id: number}}) => {
  const res = await prisma.membership.findMany({
    where: {
      projectId: Number(params.id)
    },
    include: {
      users: true,
    }
  });

  
  function getInitials(name: string) {
    const nameParts = name.split(" ");
  
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    } else if (nameParts.length === 2) {
      return nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase();
    } else {
      return nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase() + nameParts[2].charAt(0).toUpperCase();
    }
  }
  
  const formatted = res?.map((item) => ({
    id: String(item?.users?.id),
    name: item.users?.name,
    avatar: item?.users?.avatar,
    altAvatar: getInitials(item?.users?.name),
    color: item?.users?.color
  }));
  
  return responseOK(formatted, 200, "found");
};