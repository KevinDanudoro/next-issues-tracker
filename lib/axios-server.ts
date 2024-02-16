import axios from "axios";

const axiosServer = (cookies: string) =>
  axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      Cookie: cookies,
    },
  });

export default axiosServer;
