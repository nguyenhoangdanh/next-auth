import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { apiAuthPrefix, AUTH_LOGIN, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
       return;
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL(AUTH_LOGIN, nextUrl))
    }
    return;
})

export const config = {
    // matcher: ["/auth/login", "/auth/register"]
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}