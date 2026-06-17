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
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [loading, setLoading] = React.useState(false);

  const handleSignup = async () => {
    console.log(user);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      console.log("Signup successful");
      router.push("/login");
    } catch (error) {
      console.log(error);
      console.log("Signup failed");
    } finally {
      setLoading(false);
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
          max-width: 420px;
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

        .btn-signup {
          width: 100%;
          background: #f5c800;
          color: #0d0d0d;
          border: none;
          border-radius: 7px;
          padding: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 10px;
          transition: background 0.15s;
        }

        .btn-signup:hover:not(:disabled) {
          background: #e0b800;
        }

        .btn-signup:disabled {
          background: #1e1e1e;
          color: #444;
          cursor: not-allowed;
          border: 1px solid #2a2a2a;
        }

        .divider {
          height: 1px;
          background: #1e1e1e;
          margin: 20px 0;
        }

        .btn-login {
          display: block;
          width: 100%;
          background: transparent;
          color: #f5c800;
          border: 1px solid #3a2e00;
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

        .btn-login:hover {
          border-color: #f5c800;
          color: #ffe033;
        }
      `}</style>

      <div className="page">
        <div className="card">

          <Link href="/" className="back-link">← Home</Link>

          <span className="card-icon">👤</span>
          <p className="card-title">Create account</p>
          <p className="card-sub">Fill all fields to get started</p>

          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="input-field"
            />
          </div>

          <button
            className="btn-signup"
            onClick={handleSignup}
            disabled={buttonDisabled || loading}
          >
            {loading ? "Creating account..." : buttonDisabled ? "Fill all fields" : "Sign up"}
          </button>

          <div className="divider" />

          <Link href="/login" className="btn-login">
            Already have an account? Login
          </Link>

        </div>
      </div>
    </>
  );
}