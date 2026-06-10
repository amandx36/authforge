import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";
export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if(!token){
            throw new Error ("No token found in cookies ");
        }
        const decodedTokenData = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedTokenData;

    }
    catch(error:any){
        console.log(error.message || "Something went wrong in getDataFromToken");
        throw new Error(error.message );
    }
}