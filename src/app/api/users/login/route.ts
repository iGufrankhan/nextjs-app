import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Ensure DB is connected before handling requests. Awaiting here is safe in Next.js server runtime.
await connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        if (!email || !password) {
            return NextResponse.json({ message: 'Please fill all the fields' }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ message: 'User does not exist' }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        const TokenData = {
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
        };

        const token = jwt.sign(TokenData, process.env.TOKEN_SECRET || 'default_secret', { expiresIn: '1d' });
        const response = NextResponse.json({ message: 'Login successful', success: true });
        response.cookies.set('token', token, { httpOnly: true, path: '/' });
        console.log("this is the token:", token);

        return response;
    } catch (error: any) {
        console.error('Login route error:', error);
        return NextResponse.json({ message: error?.message || 'Internal Server Error' }, { status: 500 });
    }
}
