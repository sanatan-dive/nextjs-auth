"use client";


import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout success");
            router.push("/login");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                logout();
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>Profile Page</h1>
            <h2>{data === "" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />

            <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
            >
                Logout
            </button>

            <button
                className="border-white border-2 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    );
}
