"use client";

import "easymde/dist/easymde.min.css";
import type { FC } from "react";
import React, { useState } from "react";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { redirect } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { cn } from "@/lib/utils";

interface IssueForm {
  title: string;
  description: string;
}

interface ErrorForm {
  show: boolean;
  message: string;
}

const Page: FC = ({}) => {
  const [error, setError] = useState<ErrorForm>({ show: false, message: "" });
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const postNewIssue = async (data: IssueForm) => {
    try {
      const req = await axios.post("/api/issues", data);
      if (req.status == 201) {
        redirect("/issues");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setError({ message: e.message, show: true });
        setTimeout(() => setError((prev) => ({ ...prev, show: false })), 3000);
      }
    }
  };

  return (
    <>
      <div
        className={cn({
          "fixed top-0 left-0 right-0 flex justify-center py-2 duration-150 z-50":
            true,
          "translate-y-[-100%]": !error.show,
          "translate-y-0": error.show,
        })}
      >
        <Callout.Root color="red">
          <Callout.Icon>
            <FaInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error.message}</Callout.Text>
        </Callout.Root>
      </div>

      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit((data) => postNewIssue(data))}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit new issue</Button>
      </form>
    </>
  );
};

export default Page;
