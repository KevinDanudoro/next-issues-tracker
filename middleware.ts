import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_PRIVATE_ROUTE,
  DEFAULT_PUBLIC_ROUTE,
  apiAuthPrefix,
  publicApiRoute,
  publicRoute,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log(req.auth, nextUrl.pathname);

  const isPublicApiRoute = publicApiRoute.includes(nextUrl.pathname);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthPrefix) return;

  // jika client hit ke api maka izinkan
  if (isPublicApiRoute) return;

  // jika client hit ke url public maka izinkan
  if (isPublicRoute) {
    // jika sudah login maka redirect ke dashboard
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_PRIVATE_ROUTE, nextUrl));

    return;
  }

  // jika client hit ke url yang bukan public maka periksa session
  if (!isPublicRoute) {
    if (isLoggedIn) return;

    // jika belum login maka redirect ke halaman login
    // return Response.redirect(new URL(DEFAULT_PUBLIC_ROUTE, nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
