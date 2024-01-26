"use client";

import ErrorMessage from "@/components/ErrorMessage";
import { loginSchema } from "@/schema/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import Divider from "../Divider";
import { useNotifContext } from "@/context/NotifContext";
import { useRouter } from "next/navigation";

interface PageProps {}

type LoginForm = z.infer<typeof loginSchema>;

const Page: FC<PageProps> = ({}) => {
  const router = useRouter();
  const { showNotif } = useNotifContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data: LoginForm) => {
    const signInData = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (!signInData?.error) {
      router.push("/");
    } else {
      showNotif("Wrong email or password", "error");
    }
  });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="bg-slate-200 w-[340px] p-8 space-y-4 rounded-md"
      >
        <div>
          <label htmlFor="email">Email</label>
          <TextField.Root>
            <TextField.Input
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <TextField.Root>
            <TextField.Input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Login
        </Button>

        <Divider>{`don't have an account?`}</Divider>

        <Button variant="surface" type="button" className="w-full">
          <Link href="/register">Register</Link>
        </Button>
      </form>
    </div>
  );
};

export default Page;
