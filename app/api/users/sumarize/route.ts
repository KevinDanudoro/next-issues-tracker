import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
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

  return NextResponse.json(
    {
      sumarize: [
        { name: "ADMIN", ...admin },
        { name: "USER", ...user },
      ],
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=0, no-cache, no-store, must-revalidate",
      },
    }
  );
}
