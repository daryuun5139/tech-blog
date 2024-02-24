import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!robots.txt|sitemap.*.xml|api|_next/static|_next/image|favicon.ico|).*)"],
};

export function middleware(req: NextRequest) {
  console.log(req.nextUrl.href);
  if (!req.nextUrl.pathname.startsWith("/ja" || "/en")) {
    return NextResponse.redirect(new URL("/ja/", req.url));
  }
}
