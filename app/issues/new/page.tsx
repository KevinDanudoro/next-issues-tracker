"use client";

import "easymde/dist/easymde.min.css";
import type { FC } from "react";
import React, { useTransition } from "react";
import { Button, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios, { AxiosError } from "axios";
import { useNotifContext } from "@/context/NotifContext";
import { redirect } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const Page: FC = ({}) => {
  const [, startTransition] = useTransition();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const { showNotif } = useNotifContext();

  const postNewIssue = async (data: IssueForm) => {
    try {
      const req = await axios.post("/api/issues", data);
      if (req.status == 201) {
        showNotif("Success creating issue", "success");
        startTransition(() => redirect("/issues"));
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        showNotif(e.message, "error");
      }
    }
  };

  return (
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
  );
};

export default Page;
