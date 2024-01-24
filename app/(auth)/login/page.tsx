"use client";

import { Button, Separator, TextField } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import type { FC } from "react";
import { FaBug } from "react-icons/fa";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <div className="bg-gray-100 flex items-center h-12 px-6 justify-between fixed w-full">
        <FaBug size={20} />
        <Button>
          <Link href="/register">Register</Link>
        </Button>
      </div>

      <div className="w-full h-screen flex justify-center items-center">
        <form className="bg-slate-200 w-[340px] p-8 space-y-4 rounded-md">
          <div>
            <label htmlFor="email">Email</label>
            <TextField.Root>
              <TextField.Input name="email" placeholder="lorem@email.com" />
            </TextField.Root>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <TextField.Root>
              <TextField.Input
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </TextField.Root>
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>

          <div className="relative w-full flex justify-center">
            <span className="bg-slate-200 z-10 px-4 text-sm">{`don't have an account?`}</span>
            <span className="absolute block h-[2px] w-full bg-gray-400 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
          </div>

          <Button type="button" className="w-full">
            <Link href="/register">Sign Up</Link>
          </Button>
        </form>
      </div>
    </>
  );
};

export default Page;
