import NextAuth, { Session } from "next-auth";
import { JWT } from "@auth/core/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "@/prisma/client";
import { getUserByID } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 60 },
  ...authConfig,

  callbacks: {
    async session({ session, token }: { session: Session; token?: JWT }) {
      if (session.user) {
        session.user.id = token?.sub;
        session.user.name = token?.name;
        session.user.image = null;
        session.user.role = token?.role;
      }
      return session;
    },

    async jwt({ token }) {
      if (token.sub) {
        try {
          const id = Number(token.sub);
          const user = await getUserByID(id);
          if (!user) return token;

          token.name = user.username;
          token.role = user.role;
        } catch (err) {
          return token;
        }
      }

      return token;
    },
  },
});
