// connect with the database 
import {connect} from "@/app/dbConfig/dbConfig";
import User from "@/model/userModal";

import { sendVerificationEmail } from "@/helper/mailer"

// for request and response 

import { NextRequest, NextResponse } from "next/server";
import bycrypt from "bcryptjs";



connect();
// handling the post request 

export async function POST(request: NextRequest) {

try {
    const reqBody = await request.json();
    // get the data from request body 
    const {id,username, email, password} = reqBody;
    
    // check is user exist or not dude 
    const isExist = await User.findOne({email: email});
    if(isExist){
        return NextResponse.json({message: "User already exist with this email"}, {status:400})
    }

    // hash the password  with salt 
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // create the user in database 
    const newUser = new User({
        id,
        username,
        email,
        password: hashedPassword
    })
    await newUser.save();
    console.log("User created successfully",newUser);
    
   const res = await sendVerificationEmail(newUser._id,newUser.email);
    console.log(res);
    return NextResponse.json({
    success: true,
    message: "User created successfully. Verification email sent.",
});

}
catch (error:any ) {
   return NextResponse.json({message: error.message}, {status:400})
}



}

