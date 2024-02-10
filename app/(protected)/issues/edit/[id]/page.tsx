"use client";

import React, { useEffect, useTransition } from "react";
import type { FC } from "react";
import { redirect } from "next/navigation";
import {
  Button,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  TextField,
} from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { editIssueSchema, readIssueSchema } from "@/schema/validationSchema";
import { EditIssue } from "@/schema/inferedSchema";
import { useNotifContext } from "@/context/NotifContext";
import { useEditIssueMutation, useGetIssueById } from "@/hooks/issue";
import { z } from "zod";

interface PageProps {
  params: { id: string };
}

const issueStatus: z.infer<typeof readIssueSchema.shape.status>[] = [
  "OPEN",
  "IN_PROGRESS",
  "CLOSED",
];

const Page: FC<PageProps> = ({ params }) => {
  const { data } = useGetIssueById(params.id);
  const { showNotif } = useNotifContext();
  const [, startTransition] = useTransition();

  const onMutationSuccess = () => {
    showNotif("Success editing issue", "success");
    startTransition(() => redirect("/issues"));
  };
  const onMutationError = (e: Error) => {
    showNotif(e.message, "error");
  };

  const { mutate: editIssue, isLoading } = useEditIssueMutation(
    onMutationSuccess,
    onMutationError
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
      setValue("status", data.status);
    }
  }, [data, setValue]);

  return (
    <form className="max-w-xl gap-y-3 flex flex-col" onSubmit={onSubmit}>
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

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <Button variant="soft" className="capitalize w-52">
                <p>
                  Filter Status:{" "}
                  {field?.value?.toLowerCase().replaceAll("_", " ")}
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuRadioGroup {...field} onValueChange={field.onChange}>
                {issueStatus.map((stat) => (
                  <DropdownMenuRadioItem
                    key={stat}
                    value={stat}
                    className="space-x-6 capitalize"
                  >
                    {stat.toLowerCase().replaceAll("_", " ")}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        )}
      />
      <ErrorMessage>{errors.status?.message}</ErrorMessage>

      <div className="mt-3 w-full">
        <Button disabled={isLoading} className="w-full">
          Edit issue <Spinner isLoading={isLoading} />
        </Button>
      </div>
    </form>
  );
};

export default Page;
