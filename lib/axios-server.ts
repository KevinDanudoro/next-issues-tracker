import axios from "axios";

const axiosServer = (cookies: string) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL + "/api",
    headers: {
      Cookie: cookies,
    },
  });

export default axiosServer;
