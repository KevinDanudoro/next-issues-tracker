import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
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

  return NextResponse.json(
    { growths: growths },
    {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=0, no-cache, no-store, must-revalidate",
      },
    }
  );
}
