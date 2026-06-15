import axios from "axios";
import {  useState } from "react"
export default function ResetPassword(){
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const 

    const handleResetPassword = async  (e : React.FormEvent) =>{e.preventDefault();

        if (password != confirmPassword){
        alert("Password did not match ")
        return 
    }
    try{
        const response = await axios.post(
        "/api/users/login",{
          password
        }  
      )
      if(!response){
        console.log("Something went wrong");
        return 
      }
      console.log(response)

    }
    catch(error){
        console.log(error);
        console.log("Something went ")

    }
        
    }

    
    
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

            <input type="password"
        placeholder="Enter your password again"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        



       </form>

        </div>
        
        </>
    )
}