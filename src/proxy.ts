import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/checkout(.*)", "/payment(.*)"]);
const isRequestAccessRoute = createRouteMatcher([
  "/request/request-access(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    await auth.protect();
  }

  if (isRequestAccessRoute(request)) {
    await auth.protect({
      unauthenticatedUrl: new URL("/request/sign-up", request.url).toString(),
    });
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml)$).*)",
    "/(api|trpc)(.*)",
  ],
};
