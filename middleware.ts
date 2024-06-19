import { NextRequest } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
    const isLoggedIn = !!req?.auth;
    console.log("ROUTE:", isLoggedIn)
})

export const config = {
    // matcher: ["/auth/login", "/auth/register"]
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}