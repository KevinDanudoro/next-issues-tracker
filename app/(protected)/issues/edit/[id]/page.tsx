"use client";

import React, { useEffect, useTransition } from "react";
import type { FC } from "react";
import { redirect } from "next/navigation";
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
import { useEditIssueMutation, useGetIssueById } from "@/hooks/issue";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params }) => {
  const { data } = useGetIssueById(params.id);

  const { showNotif } = useNotifContext();
  const [, startTransition] = useTransition();

  const onSuccess = () => {
    showNotif("Success editing issue", "success");
    startTransition(() => redirect("/issues"));
  };
  const onError = (e: Error) => {
    showNotif(e.message, "error");
  };

  const { mutate: editIssue, isLoading } = useEditIssueMutation(
    onSuccess,
    onError
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditIssue>({
    resolver: zodResolver(editIssueSchema),
  });

  const onSubmit = handleSubmit(async (data: EditIssue) => {
    editIssue({ editedIssue: data, id: Number(params.id) });
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
      <Button disabled={isLoading}>
        Edit issue <Spinner isLoading={isLoading} />
      </Button>
    </form>
  );
};

export default Page;
