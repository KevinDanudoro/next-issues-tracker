"use client";

import React, { useTransition } from "react";
import type { FC } from "react";
import { redirect } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Button, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleMDE from "react-simplemde-editor";

import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { editIssueSchema } from "@/schema/validationSchema";
import { Createissue } from "@/schema/inferedSchema";
import { useNotifContext } from "@/context/NotifContext";
import "easymde/dist/easymde.min.css";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params }) => {
  const { showNotif } = useNotifContext();
  const [, startTransition] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Createissue>({
    resolver: zodResolver(editIssueSchema),
  });

  const onSubmit = handleSubmit(async (data: Createissue) => {
    try {
      const req = await axios.put(`/api/issues?id=${params.id}`, data);
      if (req.status == 200) {
        showNotif("Success editing issue", "success");
        startTransition(() => redirect("/issues"));
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        showNotif(e.message, "error");
      }
    }
  });

  return (
    <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
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
        Edit issue <Spinner isLoading={isSubmitting} />
      </Button>
    </form>
  );
};

export default Page;
