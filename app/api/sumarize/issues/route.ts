import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log({ api: "tess" });
  const openIssues = await prisma.issue.aggregate({
    _count: {
      _all: true,
    },
    where: {
      status: "OPEN",
    },
  });
  return NextResponse.json(openIssues, { status: 200 });
}
