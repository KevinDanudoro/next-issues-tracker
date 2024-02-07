"use client";

import React, { useEffect, useTransition } from "react";
import type { FC } from "react";
import { redirect } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Button, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { editIssueSchema } from "@/schema/validationSchema";
import { EditIssue } from "@/schema/inferedSchema";
import { useNotifContext } from "@/context/NotifContext";
import { useGetIssueById } from "@/hooks/issue";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params }) => {
  const { data } = useGetIssueById(params.id);

  const { showNotif } = useNotifContext();
  const [, startTransition] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditIssue>({
    resolver: zodResolver(editIssueSchema),
  });

  const onSubmit = handleSubmit(async (data: EditIssue) => {
    try {
      const req = await axios.put("/api/issues", data, {
        params: { id: params.id },
      });
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

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("description", data.description);
    }
  }, [data, setValue]);

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
