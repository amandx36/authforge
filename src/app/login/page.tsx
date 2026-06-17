"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", { email, password });
      console.log(response.data);
      if (response.data.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/profile");
      }
    } catch (error: any) {
      console.log("Error Occurred");
      console.log(error);
      toast.error(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Login Failed"
      );
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

        .back-link {
          display: inline-block;
          font-size: 12px;
          color: #444;
          text-decoration: none;
          margin-bottom: 24px;
          transition: color 0.15s;
        }

        .back-link:hover {
          color: #f5c800;
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

        .btn-login {
          width: 100%;
          background: #f5c800;
          color: #0d0d0d;
          border: none;
          border-radius: 7px;
          padding: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 4px;
          margin-bottom: 10px;
          transition: background 0.15s;
        }

        .btn-login:hover {
          background: #e0b800;
        }

        .btn-login:disabled {
          background: #333;
          color: #555;
          cursor: not-allowed;
        }

        .btn-signup {
          display: block;
          width: 100%;
          background: transparent;
          color: #22c55e;
          border: 1px solid #166534;
          border-radius: 7px;
          padding: 11px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s;
          box-sizing: border-box;
        }

        .btn-signup:hover {
          border-color: #22c55e;
          color: #4ade80;
        }

        .forgot-link {
          display: block;
          text-align: center;
          margin-top: 16px;
          font-size: 12px;
          color: #444;
          text-decoration: none;
          transition: color 0.15s;
        }

        .forgot-link:hover {
          color: #f5c800;
        }

        .divider {
          height: 1px;
          background: #1e1e1e;
          margin: 20px 0;
        }
      `}</style>

      <div className="page">
        <div className="card">

          <Link href="/" className="back-link">← Home</Link>

          <p className="card-title">Welcome back</p>
          <p className="card-sub">Login to your account</p>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <button
            disabled={loading}
            className="btn-login"
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="divider" />

          <Link href="/signup" className="btn-signup">
            Create account
          </Link>

          <Link href="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>

        </div>
      </div>
    </>
  );
}