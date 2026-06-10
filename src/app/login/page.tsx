"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    // API call will go here later
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
          className="btn btn-primary w-100 mb-3"
          onClick={handleLogin}
        >
          Login
        </button>

        <Link href="/signup" className="btn btn-success w-100">
          Create Account
        </Link>

      </div>
    </div>
  );
}