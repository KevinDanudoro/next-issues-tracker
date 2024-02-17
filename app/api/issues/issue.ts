import prisma from "@/prisma/client";

export const getManyUsers = async () => {
  return await prisma.issue.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const getIssueById = async (id: number) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });
  return issue;
};

export const getLatestIssues = async () => {
  return await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
};

export const getIssuesSumarize = async () => {
  const openIssues = await prisma.issue.aggregate({
    _count: {
      _all: true,
    },
    where: {
      status: "OPEN",
    },
  });

  const inProgressIssues = await prisma.issue.aggregate({
    _count: {
      _all: true,
    },
    where: {
      status: "IN_PROGRESS",
    },
  });

  const closedIssues = await prisma.issue.aggregate({
    _count: {
      _all: true,
    },
    where: {
      status: "CLOSED",
    },
  });

  const sumarizeIssues = {
    sumarize: [
      { name: "OPEN", ...openIssues },
      { name: "IN_PROGRESS", ...inProgressIssues },
      { name: "CLOSED", ...closedIssues },
    ],
  };

  return sumarizeIssues;
};
