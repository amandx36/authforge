
import {NextResponse} from "next/server";
import  type {NextRequest } from "next/server";


// matching path 
export const config ={
    matcher:[
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}

const publicRoutes = [
    "/login",
    "/signup",
    "/verify-email"
];

export async function middleware(request: NextRequest) {


    const path = request.nextUrl.pathname;
    const isPublicPath = publicRoutes.includes(path);
    const token = request.cookies.get("token")?.value || "";

    if(isPublicPath && token ){
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}