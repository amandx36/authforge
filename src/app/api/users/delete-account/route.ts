import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/model/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export  async   function DELETE(request: NextRequest) {
  try {
    const tokenData: any =  getDataFromToken(request);
    
    const {password} = await request.json();
    console.log("PASSWORD:", password);
console.log("TOKEN:", tokenData);

    if (!tokenData?.id) {
              return  NextResponse.json(
        {
                message   : "Invalid token",
        },
         {
          status    : 401,
        }
      );
    }

    const user = await User.findById(tokenData.id);
    if(!user){
        return NextResponse.json({
            message :"User Not Found",
        },{
            status : 404
        })
    }
   
    const isSame = await bcrypt.compare(password,user.password);
    if(!isSame){
        return NextResponse.json({
            message:"Password did not match",
        },{
            status:400
        })
    }

      const deletedUser = await User.findByIdAndDelete(tokenData.id);

       if (!deletedUser) {
         return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
          }
        );
    }

      const response = NextResponse.json(
      {
        success: true,
        message: "user deleted",
         },
      {
        status: 200,
      }
    );

    // deleting token   
    response.cookies.set("token", "", {
       expires: new Date(0),
        path: "/",
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
        {
        success: false,
         message: "Error no user deleted",
        error: error.message,
      },
       {
        status: 500,
      }
    );
  }
}