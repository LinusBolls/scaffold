import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { verifyToken } from "../token";
import { NextApiRequest } from "next";
import { NextURL } from "next/dist/server/web/next-url";

/*
on any request:
  if the route is an api endpoint, don't do anything
  if the user is not logged in, redirect to /login, except if the route already is /login
  if the user is logged in and the route is /login, redirect to /
  if the route is in PROTECTED_ROUTES and the user is missing the required permission, redirect to /auth-error

More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
*/

const makeRedirect = (url: NextURL) => (pathname: string) => {
  // https://nextjs.org/docs/messages/middleware-relative-urls

  url.pathname = pathname;
  return NextResponse.redirect(url);
};

const secret = process.env.JWT_SECRET;

const checkIfUserIsAuthenticated = async (
  req: NextApiRequest
): Promise<boolean> => {
  const token = await getToken({ req, secret, raw: true });

  const userInfo = verifyToken(token);

  return userInfo != null;
};

async function middleware(req: NextApiRequest & NextRequest) {
  const redirect = makeRedirect(req.nextUrl.clone());

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/")) return NextResponse.next();

  const isAuthenticated = await checkIfUserIsAuthenticated(req);

  if (!isAuthenticated && pathname !== "/login") return redirect("/login");

  if (isAuthenticated && pathname === "/login") return redirect("/");

  return NextResponse.next();
}

export default middleware;
