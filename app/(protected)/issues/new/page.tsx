"use client";

import "easymde/dist/easymde.min.css";
import type { FC } from "react";
import React, { useTransition } from "react";
import { redirect } from "next/navigation";
import { Button, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { useNotifContext } from "@/context/NotifContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/schema/validationSchema";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Createissue } from "@/schema/inferedSchema";
import { useCreateIssueMutation } from "@/hooks/issue";

const Page: FC = ({}) => {
  const { showNotif } = useNotifContext();
  const [, startTransition] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Createissue>({
    resolver: zodResolver(createIssueSchema),
  });

  const onMutationSuccess = () => {
    showNotif("Success creating issue", "success");
    startTransition(() => redirect("/issues"));
  };
  const onMutationError = (error: Error) => {
    showNotif(error.message, "error");
  };
  const { mutate: createIssue } = useCreateIssueMutation(
    onMutationSuccess,
    onMutationError
  );

  const onSubmit = handleSubmit((data: Createissue) => {
    createIssue(data);
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
        Submit new issue <Spinner isLoading={isSubmitting} />
      </Button>
    </form>
  );
};

export default Page;
