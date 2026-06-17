import cloudinary from "@/helper/cloudinary";
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
    

    return NextResponse.json(
  {
    success: true,
    message: "Buffer created successfully",
    size: buffer.length,
  },
  {
    status: 200,
  }
);
        
    }
    catch(error){

    }



}