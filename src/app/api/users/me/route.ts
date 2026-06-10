import {getDataFromToken} from  '@/helper/getDataFromToken'
import { NextRequest, NextResponse } from 'next/server'
import User from "@/model/userModal"

export async  function GET (request :NextRequest){
    try {
        const tokenData : any = getDataFromToken(request);
        const user = await User.findById(tokenData.id).select("-password");
        if(!user){
            return NextResponse.json(
                {
                    error:"User not found"
                },
                {
                    status: 404,
                }
            );

        } 
        return NextResponse.json(
            {
                message:"User Found",
                success:true,
                data:user,
            }
        );

    }
    catch (error:any){
        return NextResponse.json({
            error : error.message,
           
        },
        {
            status :500,
        }
    
    );
    }
}