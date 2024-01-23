import prisma from "@/prisma/client";
import { userSchema } from "@/schema/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validUser = userSchema.safeParse(body);

  if (!validUser.success) {
    return NextResponse.json(validUser.error.format(), { status: 400 });
  }

  const password = await bcrypt.hash(validUser.data.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: validUser.data.email,
      username: validUser.data.username,
      password: password,
      role: validUser.data.role,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
