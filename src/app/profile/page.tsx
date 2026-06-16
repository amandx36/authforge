"use client";

import { useState , useEffect} from "react"
import axios from "axios";
import { useRouter } from "next/navigation";


type User = {
    _id?: string;
    [key: string]: any;
};


export default function Profile (){
    const router = useRouter();
     
    const [user, setUser] = useState<User | null>(null);

   
    const getUserDetail= async ()=>{
        
        try{
            const response =  await  axios.get("/api/users/me")
           console.log(response);
           setUser(response.data.data);



        }
        catch(error){
            console.log(error);
            return 
        }

    }
    // load the data when page mount 
    useEffect(()=>{
        getUserDetail();
    },[]);


const logOutHandler  = async  ()=>{
    try{
    const response = await axios.post("/api/users/logout")

    console.log(response);
    router.push("/login")
    }
    catch(error){
        console.log("Error in the api")
    }

}




console.log(user);
    return (

        
<div className="container mt-5">
    <div className="card p-4 shadow">
        <h1 className="mb-4">Profile</h1>

        <p><strong>ID:</strong> {user?._id}</p>

        <p><strong>Username:</strong> {user?.username}</p>

        <p><strong>Email:</strong> {user?.email}</p>

        <p>
            <strong>Verified:</strong>{" "}
            {user?.isVerified ? "Yes" : "No"}
        </p>

        <p>
            <strong>Admin:</strong>{" "}
            {user?.isAdmin ? "Yes" : "No"}
        </p>
    </div>


        <button className="bg-red-500 text-white mx-auto mt-4 block px-4 py-2 rounded"  onClick={logOutHandler}>Log out</button>
        <button onClick={()=> router.push("/change-password")}>Update Password</button>
        <button onClick={()=>{router.push("/change-username")}}>Update  username</button>
        <button>Delete Account</button>
</div>


)

}