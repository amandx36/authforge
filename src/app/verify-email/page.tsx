"use client"
import axios from "axios";
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [Verified, setVerified] = useState(false);
  const [err, seterr] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token')
        console.log("token found")
        const result = await axios.post("/api/users/verify-email", { token });
        console.log((await result).data)
        setVerified(true);
      } catch (error) {
        console.log(error);
        seterr(true);
      }
    }
    verifyEmail();
  }, [searchParams]);

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
          padding: 48px 32px;
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #f5c800;
          margin-bottom: 32px;
        }

        /* loading spinner */
        .spinner-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .spinner {
          width: 44px;
          height: 44px;
          border: 3px solid #222;
          border-top: 3px solid #f5c800;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-text {
          font-size: 13px;
          color: #444;
          letter-spacing: 0.04em;
        }

        /* success state */
        .state-icon {
          font-size: 44px;
          display: block;
          margin-bottom: 16px;
        }

        .success-title {
          font-size: 17px;
          font-weight: 700;
          color: #4ade80;
          margin-bottom: 8px;
        }

        .success-text {
          font-size: 13px;
          color: #555;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .success-box {
          background: #052e16;
          border: 1px solid #14532d;
          border-radius: 7px;
          padding: 10px 14px;
          font-size: 12px;
          color: #4ade80;
        }

        /* error state */
        .error-title {
          font-size: 17px;
          font-weight: 700;
          color: #f87171;
          margin-bottom: 8px;
        }

        .error-text {
          font-size: 13px;
          color: #555;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .error-box {
          background: #1f0a0a;
          border: 1px solid #450a0a;
          border-radius: 7px;
          padding: 10px 14px;
          font-size: 12px;
          color: #f87171;
        }
      `}</style>

      <div className="page">
        <div className="card">

          <p className="card-title">Email Verification</p>

          {/* loading */}
          {!Verified && !err && (
            <div className="spinner-wrap">
              <div className="spinner" />
              <p className="loading-text">Verifying your email...</p>
            </div>
          )}

          {/* success */}
          {Verified && (
            <>
             
              <p className="success-title">Verification Successful</p>
              <p className="success-text">
                Your account has been verified. You can now log in.
              </p>
              <div className="success-box">You're all set — head to login</div>
            </>
          )}

          {/* error */}
          {err && (
            <>
             
              <p className="error-title">Verification Failed</p>
              <p className="error-text">
                The verification link is invalid or has expired.
              </p>
              <div className="error-box">Try requesting a new verification email</div>
            </>
          )}

        </div>
      </div>
    </>
  );
}