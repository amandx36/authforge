"use client";

import axios from "axios";
import Link from "next/link";



import { useRouter } from "next/navigation";



import React, { useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // for loading 
  const [loading, setLoading] = React.useState(false);


  const handleSignup = async () => {
    console.log(user);
   try{
    setLoading(true);
    // give data to api route 
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      console.log("Signup successful",);
      // move the user to login page 
      router.push("/login");

   } catch (error) {
    console.log(error);
    console.log("Signup failed",);
   }
   finally{
    setLoading(false);
   }
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card bg-secondary p-4" style={{ width: "450px" }}>
        <Link href="/" className="btn btn-outline-light mb-3">
          ← Home
        </Link>

        <h2 className="text-center mb-4">Signup</h2>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </div>

        <button
          className="btn btn-success w-100 mb-3"
          onClick={handleSignup}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Fill all fields" : "Signup"}
        </button>

        <Link href="/login" className="btn btn-primary w-100">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}