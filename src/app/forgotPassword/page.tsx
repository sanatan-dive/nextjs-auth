"use client";

import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post("/api/users/forgotPassword", { email });
            if (response.data.message) {
                toast.success(response.data.message)
            } else if (response.data.error) {
                toast.error(response.data.error)
            }
        } catch (error: any) {
            toast.error(error.response.data.error);
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Toaster/>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <h1 className="text-3xl text-black font-bold">Forgot Password</h1>
        <p className="text-gray-600">
          Enter your email address to reset your password
        </p>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail( e.target.value )}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
