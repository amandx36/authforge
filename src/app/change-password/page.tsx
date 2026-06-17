"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

   const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    setError("");

      if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
        return;
    }

    try {
        setLoading(true);
      const response = await axios.post("/api/users/change-password", {
        oldPassword,
          newPassword,
      });
      console.log(response.data);
      alert("Password updated successfully");
      setOldPassword("");
       setNewPassword("");
      setConfirmPassword("");
      await axios.post("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
       console.log(error);
      setError(error.response?.data?.error || "Something went wrong");
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
           margin-bottom: 16px;
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

        .back-link {
          display: block;
          text-align: center;
           margin-top: 18px;
          font-size: 12px;
          color: #444;
          cursor: pointer;
          transition: color 0.15s;
         }

        .back-link:hover {
          color: #f5c800;
        }
       `}</style>

      <div className="page">
        <div className="card">

           <span className="card-icon"></span>
          <p className="card-title">Change Password</p>
          <p className="card-sub">You'll be logged out after updating</p>

           <form onSubmit={handleChangePassword}>

            <div className="input-group">
              <label className="input-label">Current Password</label>
               <input
                type="password"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.  target.value)}
                className="input-field"
              />
            </div>

             <div className="input-group">
              <label className="input-label">New Password</label>
              <input
                type="password"
                 placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field"
               />
            </div>

            <div className="input-group">
              <label className="input-label">Confirm  Password</label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
            </div>
        
            {error && <div className="error-box"> {error}</div>}

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? "Updating..." : "Change Password"}
            </button>

          </form>

          <span className="back-link" onClick={() => router.back()}>
             Back to profile
          </span>

        </div>
      </div>
    </>
  );
}