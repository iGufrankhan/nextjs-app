"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signup successful! Please verify your email.");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup error:", error.message);
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-gray-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
          {loading ? "Processing..." : "Create Your Account 🚀"}
        </h2>

        <form onSubmit={onSignup} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                id="username"
                className="w-full pl-10 pr-3 py-2 bg-gray-800/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder-gray-400"
                placeholder="Enter username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-3 py-2 bg-gray-800/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder-gray-400"
                placeholder="you@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-3 py-2 bg-gray-800/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder-gray-400"
                placeholder="••••••••"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={buttonDisabled || loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg ${
              buttonDisabled || loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500"
            }`}
          >
            {loading
              ? "Signing Up..."
              : buttonDisabled
              ? "Fill All Fields"
              : "Sign Up"}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline"
          >
            Log In
          </Link>
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 text-xs text-gray-500"
      >
        © {new Date().getFullYear()} | DESIGNED BY GUFRAN KHAN
      </motion.p>
    </div>
  );
}
