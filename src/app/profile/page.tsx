"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, LogOut, Info } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
      toast.success("User details fetched!");
    } catch (err: any) {
      toast.error("Failed to fetch details!");
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-gray-800 text-white">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center"
      >
        <motion.div
          className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <User size={48} />
        </motion.div>

        <h1 className="text-3xl font-bold mb-2 tracking-wide">Your Profile</h1>
        <p className="text-gray-400 mb-4">Manage your account and session</p>

        <div className="bg-gray-800 rounded-lg p-3 mb-5">
          <h2 className="text-lg font-semibold mb-1">User ID:</h2>
          <p className="text-cyan-400 break-all">
            {data === "nothing" ? (
              <span className="text-gray-500 italic">No data yet</span>
            ) : (
              <Link
                href={`/profile/${data}`}
                className="underline hover:text-cyan-300 transition"
              >
                {data}
              </Link>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={getUserDetails}
            className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
          >
            <Info size={20} /> Get User Details
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={logout}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
          >
            <LogOut size={20} /> Logout
          </motion.button>
        </div>
      </motion.div>

      <motion.p
        className="text-sm text-gray-500 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        © {new Date().getFullYear()} | Designed with ❤️ in Next.js
      </motion.p>
    </div>
  );
}
