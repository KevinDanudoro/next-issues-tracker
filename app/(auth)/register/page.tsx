"use client";

import ErrorMessage from "@/components/ErrorMessage";
import { Button, TextField } from "@radix-ui/themes";
import React, { useTransition } from "react";
import type { FC } from "react";
import Divider from "../Divider";
import Link from "next/link";
import { registerSchema } from "@/schema/validationSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useNotifContext } from "@/context/NotifContext";
import { redirect } from "next/navigation";

interface PageProps {}

type RegisterForm = z.infer<typeof registerSchema>;

const Page: FC<PageProps> = ({}) => {
  const { showNotif } = useNotifContext();
  const [, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data: RegisterForm) => {
    const { email, username, password } = data;
    try {
      const req = await axios.post("/api/register", {
        email,
        username,
        password,
      });

      if (req.status === 201) {
        showNotif("User successfuly registered", "success");
        startTransition(() => redirect("/login"));
      }
    } catch (error) {
      if (error instanceof AxiosError) showNotif(error.message, "error");
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
              placeholder="lorem@email.com"
              {...register("email")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <TextField.Root>
            <TextField.Input
              placeholder="loremipsum123"
              {...register("username")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
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

        <div>
          <label htmlFor="confirm password">Confirm password</label>
          <TextField.Root>
            <TextField.Input
              type="password"
              placeholder="Enter your password confirmation"
              {...register("confirmPassword")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Register
        </Button>

        <Divider>{`already have an account?`}</Divider>

        <Button variant="surface" type="button" className="w-full">
          <Link href="/login">Login</Link>
        </Button>
      </form>
    </div>
  );
};

export default Page;
