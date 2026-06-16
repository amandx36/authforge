"use client"
import axios from "axios";
import {  useState } from "react"
import { useSearchParams,useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ResetPassword(){
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [loading,setloading] = useState(false);
    const searchParams = useSearchParams();
    const  token = searchParams.get("token");
    const router = useRouter();
    
const handleResetPassword = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  if(!token){
      alert("Invalid reset link ")
      return ;
    }

  try {
    setloading(true);
    

    const response = await axios.post(
      "/api/users/reset-password",
      { 
        token,
        password
      }
    );

    console.log(response.data);
    alert("password updated successfully redirecting to log in ")
    router.push("/login")
    toast.success("Success")
  } catch (error:any) {
    console.log(error);

  } finally {
    setloading(false);
  }
};

return (
        <>
        <h1>Welcome to reset password</h1>
        <div>
       <form onSubmit={handleResetPassword}>

        <input type="password"
            placeholder="Enter a new Password"
                 value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
        <br/>
        <br/>
        
        <input type="password"
        placeholder="Enter your password again"
          value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        <br/>
         <br/>
       <button 
       type="submit"
       disabled={loading}
       >

        {loading
        ?"Updating"
        :"Reset Password "}

       </button>


       </form>

        </div>
        
        </>
    )
}