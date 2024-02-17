import prisma from "@/prisma/client";

export const getManyUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return users;
};

export const getUsersSumarize = async () => {
  const admin = await prisma.user.aggregate({
    _count: {
      _all: true,
    },
    where: {
      role: "ADMIN",
    },
  });

  const user = await prisma.user.aggregate({
    _count: {
      _all: true,
    },
    where: {
      role: "USER",
    },
  });

  const sumarize = {
    sumarize: [
      { name: "ADMIN", ...admin },
      { name: "USER", ...user },
    ],
  };
  return sumarize;
};

export const getUsersGrowth = async () => {
  const currentDate = new Date();

  const allMonths = Array(11)
    .fill(1)
    .map((_, idx) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(2);
      date.setMonth(currentDate.getMonth() - (11 - idx - 1));
      return date;
    });

  let i = 0;
  let growths = [];

  for (const month of allMonths) {
    if (i >= allMonths.length) break;
    const growth = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: allMonths[0],
          lt: allMonths[i + 1],
        },
      },
    });
    growths.push({ date: month, growth });
    i++;
  }

  return { growths };
};
