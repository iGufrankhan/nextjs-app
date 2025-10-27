
import { NextResponse, NextRequest } from 'next/server';

export async function GET(){

    try {
        const response = NextResponse.json({ message: 'Logout successful', success: true });
        response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (error:any) {
        console.error('Logout route error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}