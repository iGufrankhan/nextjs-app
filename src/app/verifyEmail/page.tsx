"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      setError(false);
    } catch (err: any) {
      setError(true);
      setVerified(false);
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-gray-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Email Verification
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          We're verifying your email. Please wait a moment...
        </p>

        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="flex justify-center items-center mb-6"
          >
            <Loader2 size={48} className="text-cyan-400" />
          </motion.div>
        )}

        {!loading && token && (
          <div className="text-sm text-gray-400 bg-gray-800 rounded-lg p-3 break-all mb-6 border border-gray-700">
            Token: {token}
          </div>
        )}

        {!loading && verified && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-3"
          >
            <CheckCircle className="text-green-400" size={64} />
            <h2 className="text-2xl font-semibold text-green-400">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-400">
              Your account is now active. You can log in to continue.
            </p>
            <Link
              href="/login"
              className="mt-4 bg-green-600 hover:bg-green-700 transition-all font-semibold py-2 px-6 rounded-lg shadow-lg"
            >
              Go to Login
            </Link>
          </motion.div>
        )}

        {!loading && error && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-3"
          >
            <XCircle className="text-red-500" size={64} />
            <h2 className="text-2xl font-semibold text-red-500">
              Verification Failed
            </h2>
            <p className="text-gray-400">
              The token might be invalid or expired. Please try again.
            </p>
            <Link
              href="/signup"
              className="mt-4 bg-red-600 hover:bg-red-700 transition-all font-semibold py-2 px-6 rounded-lg shadow-lg"
            >
              Go to Signup
            </Link>
          </motion.div>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-gray-500 text-xs"
      >
        © {new Date().getFullYear()} | DESIGNED BY GUFRAN KHAN GULABI DIL
      </motion.p>
    </div>
  );
}
