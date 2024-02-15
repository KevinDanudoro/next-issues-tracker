import axios from "axios";
import { getAuthCookies } from "./cookies";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Cookie: getAuthCookies(),
  },
});
