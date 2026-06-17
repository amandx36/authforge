import cloudinary from "@/helper/cloudinary";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/model/userModal";

import { NextRequest,NextResponse,} from "next/server";

export async function POST( request: NextRequest) {
    try{

  const formData = await request.formData();

     const image = formData.get("image") as File;

  console.log("IMAGE:", image);
  console.log("Image recived")
        if(!image){
            return NextResponse.json ({
                    error : "Error in uploading file"
                    
            },{
                status:404
            })
        }
    const arrayBuffer : any  = await image.arrayBuffer();
    console.log("Converted to array buffer")
    // convert array buffer  to buffer for cloudaniry 
    const buffer = Buffer.from(arrayBuffer);

    console.log( "Converted to Buffer");
        console.log(buffer.length);
    
    console.log("cloudinary name "+process.env.CLOUDINARY_CLOUD_NAME)
    // uploading file as per documentation in cloudinary 
  const result: any =
      await new Promise(
        (resolve, reject) => {
           cloudinary.uploader
            .upload_stream(
               {
                folder:
                     "profile-images",
              },
                (
                error,
                  result
              ) => {
                    if (error) {
                    reject(error);
                  } else {
                  resolve(result);
                  }
              }
             )
            .end(buffer);
        }
      );
      console.log("image url ",result);

    console.log( "image url :",result.secure_url );

    console.log("public id :",result.public_id);
    const resp : any  = getDataFromToken(request);
    
    // retrive teh user 
    const user = await User.findById(resp.id)
    if(!user){
    return NextResponse.json({
        success:false,
        message:"User not found"
    },{
        status:404
    })
}
    user.profileImage = result.secure_url
    user.profileImageId = result.public_id
    await user.save();
    return NextResponse.json(
  {
    success: true,
    message: "Profile image updated successfully ",
    size: buffer.length,
    imageUrl:result.secure_url,
    imageId : result.public_id
  },
  {
    status: 200,
  }
);
        
    }
    catch(error : any ){

      console.log(error);

    return NextResponse.json(
    {
        success:false,
        message:error.message
    },
    {
        status:500
    }
    );
    }



}