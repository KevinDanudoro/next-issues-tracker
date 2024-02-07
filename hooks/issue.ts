import { NotifType } from "@/context/NotifContext";
import { ReadIssue } from "@/schema/inferedSchema";
import { readIssueSchema } from "@/schema/validationSchema";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetIssues = () => {
  const { data, isLoading, isError } = useQuery(["issues"], async () => {
    const response = await axios.get("/api/issues");
    const validatedResponse = readIssueSchema.array().safeParse(response.data);

    if (!validatedResponse.success) throw validatedResponse.error.format();
    return validatedResponse.data;
  });

  return { data, isLoading, isError };
};

export const useGetIssueById = (id: string) => {
  const { data } = useQuery(["issues"], async () => {
    const response = await axios.get("/api/issues", { params: { id } });
    const validatedResponse = readIssueSchema.safeParse(response.data);
    if (!validatedResponse.success) throw validatedResponse.error.format();
    return validatedResponse.data;
  });

  return { data };
};

export const useDeleteIssueMutation = (
  notifCallback: (message: string, type: NotifType) => void
) => {
  const queryClient = useQueryClient();

  const deleteIssue = async (id: number) => {
    const res = await axios.delete("/api/issues", {
      params: { id },
    });
    return res.data;
  };

  const { mutate, isLoading, error } = useMutation(deleteIssue, {
    onSuccess: (_, id) => {
      notifCallback("Success delete issue", "success");
      queryClient.setQueryData(["issues"], (issues?: ReadIssue[]) => {
        return issues?.filter((issue) => issue.id !== id) ?? [];
      });
    },
    onError: (error: Error) => {
      notifCallback(error.message, "error");
    },
  });

  return { mutate, isLoading, error };
};
