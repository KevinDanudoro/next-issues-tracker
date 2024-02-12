import { cookies } from "next/headers";

export function getAuthCookies() {
  const cookie = cookies();
  const authCookies = cookie
    .getAll()
    .map((c) => `${c.name}=${c.value};`)
    .reduce((prev, current) => prev + current);
  return authCookies;
}
