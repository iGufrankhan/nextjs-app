import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { request } from "http";
import { AnyARecord } from "dns";


export const getDataFromTokens=(request:NextRequest)=>
{   try {   
    const token = request.cookies.get('token')?.value||null;  
 
    const decodedToken:any= token ? jwt.verify(token, process.env.TOKEN_SECRET || 'default_secret') : null;
    return decodedToken.id;
    } catch (error:any) {
       throw new Error('Error decoding token: '+error.message);
    }


}