import { rule } from "postcss";
"use client";
import Link from "next/link"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import { userInfo } from "os";
import { set } from "mongoose";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const[user,setUser]=React.useState({
        email:"",
        password:"",
        
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {

        try {
            const response = await axios.post("/api/users/login",user)
            console.log(response.data);
            toast.success("Login success");
            router.push("/profile");
            setLoading(true);
            
            
        } catch (error: any) {
            console.log("could not login",error.message);
            toast.error(error.message);
            
        }finally{
            setLoading(false);
        }

    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{ loading? "loading...":"Login Page"}</h1>
            <hr/>
            <label htmlFor="email">email</label>
            <input
            className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            id="email" type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} 
            placeholder="email"/>
           
            <label htmlFor="password">password</label>
            <input
            className="p-2 border border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            id="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} 
            placeholder="password"/>
            <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onLogin}>{buttonDisabled? "loading...":"Login"}</button>
            <Link href="/signup">Signup</Link>
        </div>
    )
}