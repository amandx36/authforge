"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast"

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleForgotPass = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/users/forgot-password",
        {
          email,
        }
      );

      console.log(response.data);

      setSuccess(true);
      setMessage(response.data.message);
      toast.success("Success");

    } catch (error: any) {
      console.log(error);

      setSuccess(false);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      {!success ? (
        <form onSubmit={handleForgotPass}>
          <label>Enter Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

          {message && <p>{message}</p>}
        </form>
      ) : (
        <div>
          <h3>Check your email</h3>

          <p>
            We've sent a password reset link if the
            account exists.
          </p>

          <p>{message}</p>
        </div>
      )}
    </div>
  );
}