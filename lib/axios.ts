import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.DEV_API_URL
      : process.env.PROD_API_URL,
});
