import { readIssueSchema } from "@/schema/validationSchema";
import axios from "axios";
import { useQuery } from "react-query";

export const useGetIssues = () => {
  const { data, isLoading, isError } = useQuery(["issues"], async () => {
    const response = await axios.get("/api/issues");
    const validatedResponse = readIssueSchema.array().safeParse(response.data);
    if (!validatedResponse.success) throw validatedResponse.error.format();
    return validatedResponse.data;
  });

  return { data, isLoading, isError };
};
