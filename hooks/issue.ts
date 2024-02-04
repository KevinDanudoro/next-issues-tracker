import { readIssueSchema } from "@/schema/validationSchema";
import { useQuery } from "react-query";

export const useFetchIssues = () => {
  const { data, isLoading, isError } = useQuery(["issues"], async () => {
    const req = await fetch("/api/issues");
    const response = await req.json();
    const validatedResponse = readIssueSchema.array().safeParse(response);
    if (validatedResponse.success) return validatedResponse.data;
    return undefined;
  });

  return { data, isLoading, isError };
};
