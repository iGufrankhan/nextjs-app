"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(email.trim().length === 0);
  }, [email]);

  const onForgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      console.log("Forget password email sent:", response.data);
      toast.success("Password reset email sent! Please check your inbox.");
      setEmail("");
    } catch (error: any) {
      console.error("Forget password failed:", error.message);
      toast.error(
        error.response?.data?.message ||
          "Error sending password reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
          {loading ? "Processing..." : "Forgot Password 🔐"}
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Enter your registered email address and we’ll send you a password
          reset link.
        </p>

        <form onSubmit={onForgetPassword} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-3 py-2 bg-gray-800/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder-gray-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={buttonDisabled || loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
              buttonDisabled || loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500"
            }`}
          >
            <Send size={18} />
            {loading
              ? "Sending..."
              : buttonDisabled
              ? "Enter your email"
              : "Send Reset Link"}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline"
          >
            Go back to Login
          </Link>
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 text-xs text-gray-500"
      >
        © {new Date().getFullYear()} | Made with ❤️ using Next.js
      </motion.p>
    </div>
  );
}
