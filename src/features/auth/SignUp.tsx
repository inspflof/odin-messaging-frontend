import type React from "react";
import { useSignup } from "./hooks/useLogin";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearch } from "@tanstack/react-router";
import SignupForm from "./components/SignupForm";

export default function Signup() {
    const signupApi = useSignup()
    const { user } = useAuth()
    const navigate = useNavigate()
    const { redirect } = useSearch({
        from: "/auth/signup"
    })

    const [credentials, setCredentials] = useState<{ 
        username: string,
        password: string,
        displayName: string
     }>({ 
        password: "", 
        username: "" ,
        displayName: ""
    })

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }))

    }

    async function handleSignUp(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const result = await signupApi.mutateAsync({ 
            password: credentials.password, 
            username: credentials.username, 
            displayName: credentials.displayName 
        })
        
        if(result.status === 201) {
            navigate({
                to: "/auth",
                replace: true,
                search: {
                    redirect
                }
            })
        }
    }

    useEffect(() => {
        if(user) {
            navigate({
                to: redirect,
                replace: true,
            })
        }
    }, [user, navigate, redirect])

    return (
        <>
            <SignupForm 
                credentials={credentials}
                error={signupApi.error}
                handleInputChange={handleInputChange}
                handleSignUp={handleSignUp}
                isError={signupApi.isError}
                isPending={signupApi.isPending}
            />
        </>
    )
}