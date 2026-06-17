"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteAccount() {
   const [confirmation, setConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
    const router = useRouter();

   const handleAccountDeletion = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    try {
       setLoading(true);
      if (confirmation !== "END") {
          toast.error("Type END to confirm account deletion");
        return;
        }
      if (!password.trim()) {
        toast.error("Password is required");
        return;
      }
      const res = await axios.delete("/api/users/delete-account", {
          data: { password },
        });
        toast.success(res.data.message || "Account deleted successfully");
      setPassword("");
        setConfirmation("");
      router.push("/login");
    } 
    catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete account");
    } 
    finally {
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
          border: 1px solid #2a0a0a;
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
          color: #f87171;
          text-align: center;
          margin-bottom: 6px;
        }

        .card-sub {
          font-size: 12px;
          color: #dcd5d5;
          text-align: center;
          margin-bottom: 24px;
          letter-spacing: 0.03em;
        }

        .warn-box {
          background: #170303;
          border: 1px solid #450a0a;
          border-radius: 7px;
          padding: 12px 14px;
          font-size: 12px;
          color: #f87171;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .warn-box strong {
          color: #fca5a5;
        }

        .input-group {
          margin-bottom: 16px;
        }

        .input-label {
          display: block;
          font-size: 11px;
          color: #f4f0f0;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 6px;
        }

        .input-field {
          width: 100%;
          background: #938686;
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
          border-color: #f87171;
        }

        .input-field::placeholder {
          color: #c8c2c2;
        }

        .input-field:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .end-hint {
          font-size: 11px;
          color: #e2dddd;
          margin-top: 5px;
        }

        .end-hint span {
          color: #f87171;
          font-weight: 700;
          font-family: monospace;
        }

        .btn-delete {
          width: 100%;
          background: #7f1d1d;
          color: #fecaca;
          border: 1px solid #991b1b;
          border-radius: 7px;
          padding: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.15s;
        }

        .btn-delete:hover {
          background: #991b1b;
        }

        .btn-delete:disabled {
          background: #1a1a1a;
          color: #444;
          border-color: #222;
          cursor: not-allowed;
        }

        .back-link {
          display: block;
          text-align: center;
          margin-top: 18px;
          font-size: 12px;
          color: #efe8e8;
          cursor: pointer;
          transition: color 0.15s;
        }

        .back-link:hover {
          color: #f5c800;
        }
      `}</style>

      <div className="page">
        <div className="card">

         
          <p className="card-title">Delete Account</p>
           <p className="card-sub">This action is permanent and cannot be undone</p>

           <div className="warn-box">
             <strong>Warning:</strong> Deleting your account will permanently remove all your data, sessions, and access. There is no way to recover this account.
            </div>

          <form onSubmit={handleAccountDeletion}>

            <div className="input-group">
              <label className="input-label">Current Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Confirm Deletion</label>
              <input
                type="text"
                placeholder='Type END to continue'
                value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                disabled={loading}
                className="input-field"
              />
              <p className="end-hint">Type <span>END</span> in caps to confirm</p>
            </div>

            <button type="submit" disabled={loading} className="btn-delete">
              {loading ? "Deleting your account..." : "Delete Account"}
            </button>

          </form>

           <span className="back-link" onClick={() => router.back()}>
            ← Back to profile
          </span>

        </div>
      </div>
    </>
  );
}