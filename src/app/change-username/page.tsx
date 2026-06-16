"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UpdateUsername() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleUpdateUsername = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // update username logic here
    const resp = await axios.post("/api/users/change-username",{
        username
    })

    router.push("/profile");
  };

  return (
    <form onSubmit={handleUpdateUsername}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button type="submit">Update</button>
    </form>
  );
}