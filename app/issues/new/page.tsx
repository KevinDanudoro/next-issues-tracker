"use client";

import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { redirect } from "next/navigation";

interface pageProps {}

interface IssueForm {
  title: string;
  description: string;
}

const Page: FC<pageProps> = ({}) => {
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const postNewIssue = async (data: IssueForm) => {
    try {
      const req = await axios.post("/api/issues", data);
      if (req.status == 201) {
        redirect("/issues");
      }
    } catch (e) {
      if(e instanceof Error) alert(e.message)
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
