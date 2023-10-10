import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let token: string | undefined;
    const pathName: string = request.nextUrl.pathname;
    const hostName: string = request.nextUrl.hostname;

    if (request.cookies.has("token")) {
        token = request.cookies.get("token")?.value;
    } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
        token = request.headers.get("Authorization")?.substring(7);
    }

    if (!token && (pathName === "/" || pathName.startsWith("/support-coordinator"))) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (token && (pathName.startsWith("/auth/login") || pathName === "/")) {
        return NextResponse.redirect(new URL('/support-coordinator/dashboard', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/auth/login",
        "/support-coordinator/:path*"
    ]
}