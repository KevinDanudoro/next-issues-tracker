"use client";

import ErrorMessage from "@/components/ErrorMessage";
import { loginSchema } from "@/schema/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { FaBug } from "react-icons/fa";
import { z } from "zod";

interface PageProps {}

type LoginForm = z.infer<typeof loginSchema>;

const Page: FC<PageProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data: LoginForm) => {
    console.log(data);
  });

  return (
    <>
      <div className="bg-gray-100 flex items-center h-12 px-6 justify-between fixed w-full">
        <FaBug size={20} />
        <Button>
          <Link href="/register">Register</Link>
        </Button>
      </div>

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

          <div className="relative w-full flex justify-center">
            <span className="bg-slate-200 z-10 px-4 text-sm">{`don't have an account?`}</span>
            <span className="absolute block h-[2px] w-full bg-gray-400 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
          </div>

          <Button type="button" className="w-full">
            <Link href="/register">Register</Link>
          </Button>
        </form>
      </div>
    </>
  );
};

export default Page;
