"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
 

  const handleForgotPass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgot-password", { email });
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
          margin-bottom: 12px;
          display: block;
          text-align: center;
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

        .error-box {
          background: #1f0a0a;
          border: 1px solid #450a0a;
          border-radius: 7px;
          padding: 10px 14px;
          font-size: 13px;
          color: #f87171;
          margin-top: 14px;
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

        .btn-submit:hover {
          background: #e0b800;
        }

        .btn-submit:disabled {
          background: #333;
          color: #555;
          cursor: not-allowed;
        }

        .success-icon {
          font-size: 40px;
          display: block;
          text-align: center;
          margin-bottom: 16px;
        }

        .success-title {
          font-size: 18px;
          font-weight: 700;
          color: #4ade80;
          text-align: center;
          margin-bottom: 8px;
        }

        .success-text {
          font-size: 13px;
          color: #555;
          text-align: center;
          line-height: 1.7;
          margin-bottom: 12px;
        }

        .success-msg {
          background: #052e16;
          border: 1px solid #14532d;
          border-radius: 7px;
          padding: 10px 14px;
          font-size: 12px;
          color: #4ade80;
          text-align: center;
        }
      `}</style>

      <div className="page">
        <div className="card">

          {!success ? (
            <>
             
              <p className="card-title">Forgot Password</p>
              <p className="card-sub">We'll send a reset link to your email</p>

              <form onSubmit={handleForgotPass}>
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                  />
                </div>

                {message && <div className="error-box">{message}</div>}

                <button type="submit" disabled={loading} className="btn-submit">
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          ) : (
            <>
              
              <p className="success-title">Check your email</p>
              <p className="success-text">
                We've sent a password reset link if the account exists. Check your inbox and spam folder.
              </p>
              {message && <div className="success-msg">{message}</div>}
            </>
          )}
          

        </div>
      </div>
    </>
  );
}