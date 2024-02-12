import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { loginSchema } from "@/schema/validationSchema";
import { getUserByEmail } from "./lib/db";

export default {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        const validatedField = loginSchema.safeParse(credentials);
        if (!validatedField.success) return null;

        const { email, password } = validatedField.data;
        const user = await getUserByEmail(email);

        if (!user) return null;
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return null;
        return {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
