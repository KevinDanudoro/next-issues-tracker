import prisma from "@/prisma/client";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) return null;

  return user;
}

export async function getUserByID(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) return null;

  return user;
}
