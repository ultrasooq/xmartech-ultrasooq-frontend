import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { PUREMOON_TOKEN_KEY } from "./utils/constants";

export function middleware(request:NextRequest){
    const authToken = request.cookies.get(PUREMOON_TOKEN_KEY)?.value;
    const publicPaths = ['/login', '/register', '/reset-password', '/forget-password'];

    if(request.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/home', request.url))
    }

    if(publicPaths.includes(request.nextUrl.pathname)){
        return authToken ? NextResponse.redirect(new URL('/home', request.url)) : NextResponse.next()
    }

    if(authToken){
        return publicPaths.includes(request.nextUrl.pathname) ? NextResponse.redirect(new URL('/home', request.url)):NextResponse.next();
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  };