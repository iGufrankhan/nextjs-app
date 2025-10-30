import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/helpers/mailer"; // ✅ Import your helper

await connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

   
    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json(
      { message: "Password reset email sent successfully!" },
      { status: 200 }
    );

    
  } catch (error: any) {
    console.error("Error in forgot password route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
