"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type User = {
     _id?: string;
  [key: string]: any;
};

export  default function Profile() {
     const router = useRouter();
      const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);

    const getUserDetail = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

     useEffect(() => {
    getUserDetail();
  }, []);

     const updateProfilePicture = async () => {
    try {
      if (!file) {
        toast.error("Select the file first");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Max 5MB allowed");
        return;
      }
      const formData = new FormData();
        formData.append("image", file);
        await axios.post("/api/users/upload-profile", formData);
      await getUserDetail();
        setFile(null);
        toast.success("Profile picture updated successfully");
      } 
      catch (error: any) {
      console.log(error);
      toast.error("Error in uploading file");
    }
  };

  const logOutHandler = async () => {
    try {
      await axios.post("/api/users/logout");
      router.push("/login");
    }
     catch (error) {
      console.log("Error in the api");
    }
  };

  return (
     <>
      <style>{`
        .profile-page {
          min-height: 100vh;
          background: #0d0d0d;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

            .profile-card {
          background: #161616;
          border: 1px solid #222;
          border-radius: 14px;
          padding: 36px;
          width: 100%;
          max-width: 460px;
        }

        .avatar-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
        }

        .avatar-img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #f5c800;
        }

        .avatar-fallback {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #222;
          border: 3px solid #f5c800;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: #f5c800;
        }

        .profile-name {
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }

        .profile-email {
          text-align: center;
          font-size: 13px;
          color: #555;
          margin-bottom: 28px;
        }

        .divider {
          height: 1px;
          background: #222;
          margin-bottom: 24px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #1a1a1a;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          font-size: 12px;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .info-value {
          font-size: 13px;
          color: #ccc;
          font-weight: 500;
          max-width: 240px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .badge-yes {
          background: #052e16;
          color: #4ade80;
          border: 1px solid #14532d;
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 4px;
          font-weight: 600;
        }

        .badge-no {
          background: #1f0a0a;
          color: #f87171;
          border: 1px solid #450a0a;
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 4px;
          font-weight: 600;
        }

        .upload-section {
          margin-top: 24px;
          background: #111;
          border: 1px dashed #2a2a2a;
          border-radius: 8px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .upload-section input[type="file"] {
          font-size: 12px;
          color: #555;
          flex: 1;
        }

        .btn-upload {
          background: #f5c800;
          color: #0d0d0d;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-upload:hover {
          background: #e0b800;
        }

        .action-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 20px;
        }

        .btn-action {
          background: #1a1a1a;
          color: #ccc;
          border: 1px solid #2a2a2a;
          padding: 10px;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }

        .btn-action:hover {
          border-color: #f5c800;
          color: #f5c800;
        }

        .btn-logout {
          width: 100%;
          margin-top: 10px;
          background: transparent;
          color: #f87171;
          border: 1px solid #450a0a;
          padding: 10px;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }

        .btn-logout:hover {
          background: #1f0a0a;
        }
      `}</style>

      <div className="profile-page">
        <div className="profile-card">

          {/* avatar */}
          <div className="avatar-wrap">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="avatar-img" />
            ) : (
              <div className="avatar-fallback">👤</div>
            )}
          </div>

          <p className="profile-name">{user?.username || "Loading..."}</p>
          <p className="profile-email">{user?.email || ""}</p>

               <div className="divider" />

                {/* info rows */}
          <div className="info-row">
            <span className="info-label">User ID</span>
                  <span className="info-value">{user?._id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Username</span>
                  <span className="info-value">{user?.username}</span>
          </div>
              <div className="info-row">
            <span className="info-label">Email</span>
              <span className="info-value">{user?.email}</span>
          </div>
                    <div className="info-row">
            <span className="info-label">Verified</span>
              <span className={user?.isVerified ? "badge-yes" : "badge-no"}>
              {user?.isVerified ? "Yes" : "No"}
                 </span>
          </div>
            <div className="info-row">
            <span className="info-label">Admin</span>
            <span className={user?.isAdmin ? "badge-yes" : "badge-no"}>
                  {user?.isAdmin ? "Yes" : "No"}
            </span>
          </div>

          {/* upload */}
          <div className="upload-section">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) setFile(selectedFile);
              }}
            />
            <button className="btn-upload" onClick={updateProfilePicture}>
              Upload
            </button>
           </div>

          {/* action buttons */}
             <div className="action-grid">
                    <button className="btn-action" onClick={() => router.push("/change-password")}>
                     Update Password
            </button>
            <button className="btn-action" onClick={() => router.push("/change-username")}>
                  Update Username
            </button>
            <button className="btn-action" onClick={() => router.push("/delete-account")}>
                   Delete Account
             </button>
              <button className="btn-action" onClick={() => router.push("/forgot-password")}>
                   Forgot Password
             </button>
          </div>

          <button className="btn-logout" onClick={logOutHandler}>
            Log out
          </button>

                </div>
       </div>
     </>
    );
}