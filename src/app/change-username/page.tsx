"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UpdateUsername() {
      const [username, setUsername] = useState("");
  const router = useRouter();

   const handleUpdateUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     const resp = await axios.post("/api/users/change-username", { username });
    router.push("/profile");
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

         
           <p className="card-title">Update Username</p>
          <p className="card-sub">Pick something you'll actually remember</p>

           <form onSubmit={handleUpdateUsername}>
             <div className="input-group">
              <label className="input-label">New Username</label>
               <input
                type="text"
                 placeholder="Enter new username"
                value={username}
                 onChange={(e) => setUsername(e.target.value)}
                className="input-field"
               />
            </div>

            <button type="submit" className="btn-submit">
              Update Username
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