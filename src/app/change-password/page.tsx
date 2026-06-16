"use client";

import { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChangePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/users/change-password",
        {
          oldPassword,
          newPassword,
        }
      );

      console.log(response.data);

      alert("Password updated successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error: any) {
      console.log(error);

      setError(
        // API error message or default fallback
        error.response?.data?.error ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleChangePassword}>

        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) =>
            setOldPassword(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <br />
        <br />

        {error && (
          <p>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Change Password"}
        </button>

      </form>
    </div>
  );
}