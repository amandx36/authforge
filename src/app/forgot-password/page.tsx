"use client"
import axios from "axios";
import { useState } from "react";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPass = async (e :any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/users/",
        {
          email,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Welcome to Verify Email Page</h2>

      <form onSubmit={handleForgotPass}>
        <label>Enter Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
}