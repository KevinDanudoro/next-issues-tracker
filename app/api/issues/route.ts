import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema, editIssueSchema } from "@/schema/validationSchema";
import { z } from "zod";
import {
  getIssueById,
  getIssuesSumarize,
  getLatestIssues,
  getManyUsers,
} from "./issue";

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
  const isValidId = validatedId.success && id !== null;

  const isLatest = !!searchParams.get("latest");
  const isSumarize = !!searchParams.get("sumarize");

  if (isValidId)
    return NextResponse.json(await getIssueById(validatedId.data), {
      status: 200,
    });

  if (isLatest)
    return NextResponse.json(await getLatestIssues(), { status: 200 });

  if (isSumarize)
    return NextResponse.json(await getIssuesSumarize(), { status: 200 });

  return NextResponse.json(await getManyUsers(), { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id === undefined)
    return NextResponse.json(
      { error: true, message: "id is undefined" },
      { status: 400 }
    );

  const validatedId = z.coerce.number().safeParse(id);
  if (!validatedId.success)
    return NextResponse.json(validatedId.error.format(), { status: 400 });

  const body = await req.json();
  const updatedIssue = editIssueSchema.safeParse(body);
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

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const ids = searchParams.getAll("id[]");

  if (id === null && ids.length === 0)
    return NextResponse.json(
      { error: true, message: "id is undefined" },
      { status: 400 }
    );

  if (id) {
    const validatedId = z.coerce.number().safeParse(id);
    if (!validatedId.success)
      return NextResponse.json(validatedId.error.format(), { status: 400 });

    const deleteIssues = await prisma.issue.delete({
      where: {
        id: validatedId.data,
      },
    });
    return NextResponse.json(deleteIssues, { status: 200 });
  } else if (ids) {
    const validatedIds = z.array(z.coerce.number()).safeParse(ids);
    if (!validatedIds.success)
      return NextResponse.json(validatedIds.error.format(), { status: 400 });

    const deleteIssues = await prisma.issue.deleteMany({
      where: {
        id: {
          in: validatedIds.data,
        },
      },
    });
    return NextResponse.json(deleteIssues, { status: 200 });
  }

  return NextResponse.json(
    { error: true, message: "Something went wrong" },
    { status: 500 }
  );
}
