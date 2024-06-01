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
  
  const formatted = res?.map((item) => ({
    value: String(item?.users?.id),
    label: item.users?.name
  }));
  
  return responseOK(formatted, 200, "found");
};