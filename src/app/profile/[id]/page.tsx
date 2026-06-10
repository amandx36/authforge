"use client";
import axios from "axios";
import {toast} from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ProfilePage(
{  params,
}: {
     params: {id: string}
}

){
    const [user, setUser] = useState<any>(null);

    const {id} = params;
    console.log("User ID from URL:", id);
    const router = useRouter();

    const logout = async () =>{

        try{
                // log out the user 
                const respo = await axios.post("/api/users/logout")
                console.log("user log out successfully", respo.data);
                toast.success("Logout successful");
                router.push("/login");

        }
        catch(error:any){
            console.log(error.message || "Something went wrong in logout")
        }

    }
    return (
        <>
        <div className="container mt-5">    
            <h1>Profile and its id  is this {id}</h1>
        </div>   

        <button 
        onClick={logout}
        className="btn btn-danger mt-3">
            Logout
        </button>     
        </>
    )
}