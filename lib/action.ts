"use server";

import { signIn, signOut } from "@/auth";
import { DEFAULT_PRIVATE_ROUTE, DEFAULT_PUBLIC_ROUTE } from "@/routes";
import { loginSchema } from "@/schema/validationSchema";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (data: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      redirectTo: DEFAULT_PRIVATE_ROUTE,
      ...data,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut({ redirectTo: DEFAULT_PUBLIC_ROUTE });
  } catch (error) {
    if (error instanceof AuthError) return { error: "Something went wrong" };
    throw error;
  }
};
