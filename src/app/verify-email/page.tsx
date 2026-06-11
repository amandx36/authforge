"use client"
import axios from "axios";
import { useSearchParams } from "next/navigation"
import { useState,useEffect } from "react";
export default function VerifyEmail(){
    const searchParams = useSearchParams();
    const[Verified,setVerified] = useState(false);
    const [err,seterr]  = useState(false);

    

    // now when the page load then grab the token all things happens once otherwise un-necessary api calls 
useEffect(() => {
    const verifyEmail = async ()=>{

        try{
            const token = searchParams.get('token')
            console.log("token found")
            // api call for verify 
            const result =  await axios.post("/api/users/verify-email",{token});
            console.log((await result).data)
            setVerified(true);
        }
        catch(error){
        console.log(error);
            seterr(true);


        }

    }
    verifyEmail();
 
}, [searchParams]); 


return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">

      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Email Verification
      </h1>

      {!Verified && !err && (
        <div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Verifying your email...
          </p>
        </div>
      )}

      {Verified && (
        <div>
        

          <h2 className="text-green-600 text-xl font-semibold mb-2">
            Verification Successful
          </h2>

          <p className="text-gray-600">
            Your account has been verified. You can now log in.
          </p>
        </div>
      )}

      {err && (
        <div>
         

          <h2 className="text-red-600 text-xl font-semibold mb-2">
            Verification Failed
          </h2>

          <p className="text-gray-600">
            The verification link is invalid or has expired.
          </p>
        </div>
      )}
    </div>
  </div>
);

}