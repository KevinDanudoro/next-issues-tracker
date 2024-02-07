import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../../schema/validationSchema";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const validatedId = z.coerce.number().safeParse(id);

  if (validatedId.success && id != null) {
    const issues = await prisma.issue.findUnique({
      where: {
        id: validatedId.data,
      },
    });
    return NextResponse.json(issues, { status: 200 });
  }

  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const validatedId = z.coerce.number().safeParse(id);
  if (!validatedId.success)
    return NextResponse.json(validatedId.error.format(), { status: 400 });

  const body = await req.json();
  const updatedIssue = createIssueSchema.safeParse(body);
  if (!updatedIssue.success)
    return NextResponse.json(updatedIssue.error.format(), { status: 400 });

  const update = await prisma.issue.update({
    where: {
      id: validatedId.data,
    },
    data: updatedIssue.data,
  });
  return NextResponse.json(update, { status: 200 });
}
