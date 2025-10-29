import mongoose from "mongoose";
import {connectToDatabase} from "@/dbConfig/dbConfig";
import User from  "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connectToDatabase();



export async function POST(request: NextRequest) {


    try {

        const reqBody=await request.json();
        const {username,email,password}=reqBody;
        if(!username || !email || !password){
            return NextResponse.json({error:"Please fill all the fields"},{status:400});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return NextResponse.json({error:"User already exists"},{status:400});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);   

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        }); 
        if(!newUser){
            return NextResponse.json({error:"Failed to create user"},{status:500});
        }
      const savedUser = await newUser.save();
      if(!savedUser){
        return NextResponse.json({error:"Failed to save user"},{status:500});
      }


      // send em`ail verification link here

      await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});


        return NextResponse.json({message:"User registered successfully",success:true,savedUser},{status:201});


     

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
 
  }

