import next from 'next';    

import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
    const path = request.nextUrl.pathname;

    const ispublicPath = path.startsWith('/login') || path.startsWith('/signup');
    request.cookies.get('token');

    const token = request.cookies.get('token')?.value||null;  
    if (token && ispublicPath) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }   
    if (!token && !ispublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }





}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
  ]
}