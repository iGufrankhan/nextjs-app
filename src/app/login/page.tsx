"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // ✅ Enable/disable login button dynamically
  useEffect(() => {
    if (user.email.length>0 && user.password.length>0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // ✅ Handle login
  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

  const response = await axios.post("/api/users/login", user);
  console.log("Login successful:", response.data);

  toast.success("Login successful! Redirecting...");
  // Redirect to profile page after successful login
  router.push("/profile");
    } catch (error: any) {
      console.error("Login failed:", error.message);
      toast.error(error.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          {loading ? "Processing..." : "Log In"}
        </h2>

        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1 text-gray-800"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 p-2 rounded text-black"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1 text-gray-800"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 p-2 rounded text-black"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={buttonDisabled || loading}
            className={`w-full text-white p-2 rounded transition ${
              buttonDisabled || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading
              ? "Logging In..."
              : buttonDisabled
              ? "Fill All Fields"
              : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
