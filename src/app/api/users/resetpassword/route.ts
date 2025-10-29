import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

await connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and new password are required." },
        { status: 400 }
      );
    }

    // ✅ Find user with matching reset token
    const user = await User.findOne({
      forgetpasswordToken: token,
      forgetpasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 400 }
      );
    }

    // ✅ Hash new password and update
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.forgetpasswordToken = undefined;
    user.forgetpasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
