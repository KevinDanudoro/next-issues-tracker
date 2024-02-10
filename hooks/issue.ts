import { Createissue, EditIssue, ReadIssue } from "@/schema/inferedSchema";
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
  const { data } = useQuery(["issues", { id }], async () => {
    const response = await axios.get("/api/issues", { params: { id } });
    const validatedResponse = readIssueSchema.safeParse(response.data);
    if (!validatedResponse.success) throw validatedResponse.error.format();
    return validatedResponse.data;
  });

  return { data };
};

export const useCreateIssueMutation = (
  onSuccess: () => void,
  onError: (e: Error) => void
) => {
  const queryClient = useQueryClient();

  const createIssue = async (data: Createissue) => {
    const res = await axios.post("/api/issues", data);
    const validatedRes = readIssueSchema.safeParse(res.data);
    if (!validatedRes.success) return null;
    return validatedRes.data;
  };

  const { mutate } = useMutation(createIssue, {
    onSuccess: (data) => {
      queryClient.setQueryData(["issues"], (currentIssues?: ReadIssue[]) => {
        if (!data && currentIssues) return currentIssues;
        if (data && !currentIssues) return [data];
        if (!data || !currentIssues) return [];
        const newIssues = currentIssues.concat(data);
        return newIssues;
      });
      onSuccess();
    },
    onError: onError,
  });

  return { mutate };
};

export const useEditIssueMutation = (
  onSuccess: () => void,
  onError: (e: Error) => void
) => {
  const queryClient = useQueryClient();

  const editIssue = async ({
    editedIssue,
    id,
  }: {
    editedIssue: EditIssue;
    id: number;
  }) => {
    const res = await axios.put("/api/issues", editedIssue, {
      params: { id },
    });
    return res.data;
  };

  const { mutate, isLoading, error } = useMutation(editIssue, {
    onSuccess: (_, { id, editedIssue }) => {
      onSuccess();
      queryClient.setQueryData(["issues"], (issues?: ReadIssue[]) => {
        return (
          issues?.map((issue) =>
            issue.id === id ? { ...issue, ...editedIssue } : issue
          ) ?? []
        );
      });
    },
    onError: onError,
  });

  return { mutate, isLoading, error };
};

export const useDeleteIssueMutation = (
  onSuccess: () => void,
  onError: (e: Error) => void
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
      onSuccess();
      queryClient.setQueryData(["issues"], (issues?: ReadIssue[]) => {
        return issues?.filter((issue) => issue.id !== id) ?? [];
      });
    },
    onError: onError,
  });

  return { mutate, isLoading, error };
};

export const useDeleteManyIssuesMutation = (
  onSuccess: () => void,
  onError: (e: Error) => void
) => {
  const queryClient = useQueryClient();

  const deleteIssue = async (id: number[]) => {
    const res = await axios.delete("/api/issues", {
      params: { id },
    });
    return res.data;
  };

  const { mutate, isLoading, error } = useMutation(deleteIssue, {
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries(["issues"]);
    },
    onError: onError,
  });

  return { mutate, isLoading, error };
};
