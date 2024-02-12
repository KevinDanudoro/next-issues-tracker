import prisma from "@/prisma/client";
import { issuesSumarizeSchema } from "@/schema/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
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

  const sumarizeIssues: z.infer<typeof issuesSumarizeSchema> = {
    sumarize: [
      { name: "OPEN", ...openIssues },
      { name: "IN_PROGRESS", ...inProgressIssues },
      { name: "CLOSED", ...closedIssues },
    ],
  };

  return NextResponse.json(sumarizeIssues, { status: 200 });
}
