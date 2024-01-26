import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { loginSchema } from "@/schema/validationSchema";
import { getUserByEmail } from "./lib/db";

export default {
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const validatedField = loginSchema.safeParse(credentials);
        if (!validatedField.success) return null;

        const { email, password } = validatedField.data;
        const user = await getUserByEmail(email);

        if (!user) return null;
        const passwordMatch = await bcrypt.hash(password, user.password);

        if (!passwordMatch) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
