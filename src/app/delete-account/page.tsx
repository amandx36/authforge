import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";



export default function Delete_account(){
    const [data,useData] =
        useState("");
    const [Password,usePassword] = 
        useState("")
    const router = useRouter();
    

    const handleAccountDeletation = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(data!="END"){
            toast.error("Enter Proper Keyword")
        }
        const res = axios.post("/api/users/delete-account",
            {
                Password
            }
        )
        console.log(res);
        usePassword("");
        router.push("/profile")
        console.log("Account deleted");
        
    }

    
        return(
            <>
                <div>
                    <form onSubmit={handleAccountDeletation}></form>
                </div>
            </>
        )
}