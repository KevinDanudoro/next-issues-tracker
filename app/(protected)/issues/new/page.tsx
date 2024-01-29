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
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema, userSchema } from "@/schema/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const Page: FC = ({}) => {
  const { showNotif } = useNotifContext();
  const [, startTransition] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data: IssueForm) => {
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
  });

  return (
    <form className="max-w-xl space-y-3 mx-6" onSubmit={onSubmit}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={isSubmitting}>
        Submit new issue <Spinner isLoading={isSubmitting} />
      </Button>
    </form>
  );
};

export default Page;
