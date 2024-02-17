import { NextRequest, NextResponse } from "next/server";
import { getManyUsers, getUsersGrowth, getUsersSumarize } from "./user";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const isSumarize = !!searchParams.get("sumarize");
  const isGrowth = !!searchParams.get("growth");

  if (isSumarize)
    return NextResponse.json(await getUsersSumarize(), { status: 200 });
  if (isGrowth)
    return NextResponse.json(await getUsersGrowth(), { status: 200 });

  return NextResponse.json(await getManyUsers(), { status: 200 });
}
