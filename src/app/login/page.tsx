import { rule } from "postcss";
"use client";
import Link from "next/link"
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";
import { userInfo } from "os";

export default function LoginPage(){

    const[user,setUser]=React.useState({
        email:"",
        password:"",
        
    })

    const onLogin = async () => {

        

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup Page</h1>
            <hr/>
            <label htmlFor="email">email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            id="email" type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} 
            placeholder="email"/>
           
            <label htmlFor="password">password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            id="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} 
            placeholder="password"/>
            <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onLogin}>Login</button>
            <Link href="/signup">Signup</Link>
        </div>
    )
}