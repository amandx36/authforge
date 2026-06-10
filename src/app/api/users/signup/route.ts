// connect with the database 
import {connect} from "@/app/dbConfig/dbConfig";
import User from "@/model/userModal";


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
    return NextResponse.json({
        message: "User created successfully",
        success:true,
        newUser
    })
    

}
catch (error:any ) {
   return NextResponse.json({message: error.message}, {status:400})
}



}

