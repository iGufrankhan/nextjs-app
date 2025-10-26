"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios"; 
import { set } from "mongoose";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);




  useEffect(() => {
    if(user.username.length >0 && user.email.length>0 && user.password.length>0){
        setButtonDisabled(false);   
    }else{
        setButtonDisabled(true); 
    }
  }, [user]);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post('/api/users/signup', user);
      console.log("Signup response:", response.data);

      toast.success('Signup successful — please log in');
      // Redirect to login page after successful signup
      router.push('/login');
    } catch (error: any) {
      console.log("Signup error:", error.message);
      toast.error(error.response?.data?.message || error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };
















  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Sign Up</h2>
        <form onSubmit={onSignup} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1 text-gray-800"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 p-2 rounded"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800" htmlFor="email">
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            {buttonDisabled ? "NO Sign Up" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );





}
