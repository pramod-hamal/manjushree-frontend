import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let token: string | undefined | null;
    const pathName: string = request.nextUrl.pathname;
    if (request.cookies.has("token")) {
        token = request.cookies.get("token")?.value;
    } else if (request.headers.get("x-access-token")) {
        token = request.headers.get("x-access-token");
    }

    if (!token && (pathName === "/" || pathName.startsWith("/manjushree"))) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }


    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/auth/login",
        "/manjushree/:path*"
    ]
}