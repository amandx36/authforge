
"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import "./reset-password.css";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const handleResetPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    try {
      setloading(true);

      const response = await axios.post(
        "/api/users/reset-password",
        {
          token,
          password,
        }
      );

      console.log(response.data);

      toast.success("Password updated successfully");

      router.push("/login");
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.error ||
          "Something went wrong"
      );
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h1 className="reset-title">
          Reset Password
        </h1>

        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="reset-input"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="reset-input"
          />

          <button
            type="submit"
            disabled={loading}
            className="reset-btn"
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

