"use client"
import axios from "axios";
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!token) {
      alert("Invalid reset link");
      return;
    }
    try {
      setloading(true);
      const response = await axios.post("/api/users/reset-password", { token, password });
      console.log(response.data);
      toast.success("Password updated successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <style>{`
        .page {
          min-height: 100vh;
          background: #0d0d0d;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .card {
          background: #161616;
          border: 1px solid #222;
          border-radius: 14px;
          padding: 36px 32px;
          width: 100%;
          max-width: 400px;
        }

        .card-icon {
          font-size: 28px;
          display: block;
          text-align: center;
          margin-bottom: 10px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #f5c800;
          text-align: center;
          margin-bottom: 6px;
        }

        .card-sub {
          font-size: 12px;
          color: #444;
          text-align: center;
          margin-bottom: 28px;
          letter-spacing: 0.03em;
        }

        .input-group {
          margin-bottom: 16px;
        }

        .input-label {
          display: block;
          font-size: 11px;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 6px;
        }

        .input-field {
          width: 100%;
          background: #111;
          border: 1px solid #2a2a2a;
          border-radius: 7px;
          padding: 11px 14px;
          font-size: 14px;
          color: #e0e0e0;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }

        .input-field:focus {
          border-color: #f5c800;
        }

        .input-field::placeholder {
          color: #333;
        }

        .match-hint {
          font-size: 11px;
          margin-top: 5px;
          color: #444;
        }

        .match-hint.ok {
          color: #4ade80;
        }

        .match-hint.no {
          color: #f87171;
        }

        .btn-submit {
          width: 100%;
          background: #f5c800;
          color: #0d0d0d;
          border: none;
          border-radius: 7px;
          padding: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.15s;
        }

        .btn-submit:hover:not(:disabled) {
          background: #e0b800;
        }

        .btn-submit:disabled {
          background: #333;
          color: #555;
          cursor: not-allowed;
        }
      `}</style>

      <div className="page">
        <div className="card">

          <span className="card-icon">🔒</span>
          <p className="card-title">Reset Password</p>
          <p className="card-sub">Enter your new password below</p>

          <form onSubmit={handleResetPassword}>

            <div className="input-group">
              <label className="input-label">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
              {confirmPassword.length > 0 && (
                <p className={`match-hint ${password === confirmPassword ? "ok" : "no"}`}>
                  {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? "Updating..." : "Reset Password"}
            </button>

          </form>

        </div>
      </div>
    </>
  );
}