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

  const handleAccountDeletion = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
      
      const res = await axios.delete(
        "/api/users/delete-account",  {
        data: {
          password,
        },
      }
      );

      console.log(res);
      toast.success(
        res.data.message || "Account deleted successfully"
      );

         setPassword("");
      setConfirmation("");

      router.push("/login");
    } 
    catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Delete Account</h1>

      <form onSubmit={handleAccountDeletion}>
        <div>
          <input
            type="password"
              placeholder="current password"
            value={password}
              onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
             <input
            type="text"
            placeholder='Type END to continue'
                      value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
            disabled={loading}
          />
        </div>

          <button
          type="submit"
            disabled={loading}
        >
          {loading ? "Deleting your account" : "Delete Account"}
          </button>
          </form>
    </div>
  );
}