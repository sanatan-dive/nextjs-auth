"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"


export default function VerifyEmailPage(){
    const[token,setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post(`/api/users/verifyemail`, {token})
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error);
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    },[])


    useEffect(() => {
        if (token.length > 0) verifyUserEmail()
    }, [token])
//if dependency array is update then this effect is called

return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold"> verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black"
        >{token?`${token}`:'no token'}</h2>

        {verified && (
            <div>
                <h2 className="p-2 text-2xl text-white">
                    email verified
                </h2>
                <Link className="p-2 text-2xl text-white" href="/login">
                    Login
                </Link>
            </div>
        )}

        {error && (
            <div>
                <h2 className="p-2 text-2xl text-black">
                    something went wrong
                </h2>
            </div>
        )}

    </div>
)

}