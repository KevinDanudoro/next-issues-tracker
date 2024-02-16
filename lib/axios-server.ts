import axios from "axios";

const axiosServer = (cookies: string) =>
  axios.create({
    baseURL:
      (process.env.NODE_ENV === "development"
        ? process.env.DEV_APP_URL
        : process.env.PROD_APP_URL) + "api",
    headers: {
      Cookie: cookies,
    },
  });

export default axiosServer;
