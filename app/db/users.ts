import prisma from "@lib/prisma";

export const getUserIdByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  });
};