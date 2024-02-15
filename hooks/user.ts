import { useQuery } from "react-query";
import { GrowthUserSchema, SumarizedUserSchema } from "@/schema/inferedSchema";
import { growthUserSchema, userSumarizeShema } from "@/schema/validationSchema";
import axios from "axios";

export const useGetUsersGrowth = (initialData?: GrowthUserSchema) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/issues/growth");
      const validatedResponse = growthUserSchema.safeParse(response.data);

      if (!validatedResponse.success) throw validatedResponse.error.format();
      return validatedResponse.data;
    },
    initialData: initialData,
  });

  return { data, isLoading, isError };
};

export const useGetUserSumarize = (initialData?: SumarizedUserSchema) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", "sumarize"],
    queryFn: async () => {
      const response = await axios.get("/api/issues/sumarize");
      const validatedResponse = userSumarizeShema.safeParse(response.data);

      if (!validatedResponse.success) throw validatedResponse.error.format();
      return validatedResponse.data;
    },
    initialData: initialData,
  });

  return { data, isLoading, isError };
};
