import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function POST( request: NextRequest) {
    try{

  const formData = await request.formData();

     const image = formData.get("image");

  console.log("IMAGE:", image);
  console.log("Image recived")

  const arrayBuffer = 
    }
    catch(error){

    }



}