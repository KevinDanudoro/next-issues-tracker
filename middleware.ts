import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_PRIVATE_ROUTE,
  DEFAULT_PUBLIC_ROUTE,
  apiRoutePrefix,
  publicRoute,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log({ isLoggedIn });

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);

  // jika client hit ke api maka izinkan
  if (isApiAuthRoute) return null;

  // jika client hit ke url public maka izinkan
  if (isPublicRoute) {
    // jika sudah login maka redirect ke dashboard
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_PRIVATE_ROUTE, nextUrl));

    return null;
  }

  // jika client hit ke url yang bukan public maka periksa session
  if (!isPublicRoute) {
    if (isLoggedIn) return null;

    // jika belum login maka redirect ke halaman login
    return Response.redirect(new URL(DEFAULT_PUBLIC_ROUTE, nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
