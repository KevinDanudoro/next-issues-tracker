import prisma from "@/prisma/client";
import { userSchema } from "@/schema/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validUser = userSchema.safeParse(body);

  if (!validUser.success) {
    return NextResponse.json(validUser.error.format(), { status: 400 });
  }

  const existingUser = await getUserByEmail(validUser.data.email);

  if (existingUser)
    return NextResponse.json("Email has already in use", { status: 400 });

  const hashedPassword = await bcrypt.hash(validUser.data.password, 10);
  console.log(validUser.data.password);
  console.log(hashedPassword);

  const newUser = await prisma.user.create({
    data: {
      email: validUser.data.email,
      username: validUser.data.username,
      password: hashedPassword,
      role: validUser.data.role || "USER",
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
