import type React from "react";
import LoginForm from "./components/LoginForm";
import { useLogin } from "./hooks/useLogin";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

export default function Login() {
    const loginApi = useLogin()
    const { login, logout, user } = useAuth()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState<{ 
        username: string,
        password: string
     }>({ 
        password: "", 
        username: "" 
    })

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }))

    }

    async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const result = await loginApi.mutateAsync({ password: credentials.password, username: credentials.username })
        if(result.data) {
            login(result.data.accessToken)
        }
    }

    useEffect(() => {
        if(user) {
            navigate({
                to: "..",
                replace: true,
            })
        }
    }, [user, navigate])

    return (
        <>
            <LoginForm 
                credentials={credentials}
                error={loginApi.error}
                handleInputChange={handleInputChange}
                handleLogin={handleLogin}
                isError={loginApi.isError}
                isPending={loginApi.isPending}
            />
            <button onClick={logout}>Logout</button>
        </>
    )
}