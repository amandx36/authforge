"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation"


export default function LoginPage() {


const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setloading] = useState(false);

  const  handleLogin =  async () => {
    console.log("Email:", email);
    console.log("Password:", password);
  

    // API call
    try{
      setloading(true);
      const response = await axios.post(
        "/api/users/login",{
          email,
          password,
        }
      )
      console.log(response.data);
      if(response.data.role==="ADMIN"){
        router.push("/admin/dashboard")
      }
      else{
        router.push("/profile")
      }
      

    }
    catch(error){
      console.log("Error Occurred") ; 
      console.log(error);
      

    }
    finally{
      setloading(false);
    }
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card bg-secondary p-4" style={{ width: "400px" }}>
        
        <Link href="/" className="btn btn-outline-light mb-3">
          ← Home
        </Link>

        <h2 className="text-center mb-4">Login</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
       disabled={loading}
        className="btn btn-primary w-100 mb-3"
     onClick={handleLogin}
        >
       {loading ? "Logging In..." : "Login"}
        </button>

        <Link href="/signup" className="btn btn-success w-100">
          Create Account 
        </Link>
        <br />
        <Link href="/forgot-password">
          Forgot Password?
        </Link>

      </div>
    </div>
  );
}