import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { getUserByEmail } from "./db";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "lorem@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const existingUser = await getUserByEmail(credentials.email);
        if (!existingUser) return null;

        const passwordMatch = bcrypt.compare(
          existingUser.password,
          credentials.password
        );
        if (!passwordMatch) return null;

        return {
          id: existingUser.id.toString(),
          email: existingUser.email,
          username: existingUser.username,
        };
      },
    }),
  ],
};
