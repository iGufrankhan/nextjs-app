import { NextRequest, NextResponse } from "next/server";
import { getDataFromTokens as getDataFromToken } from "@/helpers/getDatafromtokens";
import User from "@/models/userModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

// Ensure DB is connected before handling requests. Awaiting here is safe in Next.js server runtime.
await connectToDatabase();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}