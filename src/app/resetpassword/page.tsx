"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    if (token) {
      setTokenValid(true);
    } else {
      toast.error("Invalid or missing token.");
    }
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      toast.success(response.data.message || "Password reset successful!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-100"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-500 text-white p-3 rounded-full mb-3 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {loading ? "Processing..." : "Reset Password"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Please enter your new password below
          </p>
        </div>

        {!tokenValid ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-600 bg-red-50 p-3 rounded-lg"
          >
            Invalid or expired token. Please request a new reset link.
          </motion.p>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2.5 rounded-lg text-black outline-none"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2.5 rounded-lg text-black outline-none"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className={`w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-300 ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-700 hover:shadow-lg"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
