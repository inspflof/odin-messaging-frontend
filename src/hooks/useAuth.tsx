import React from "react"
import { useContext, useState, useEffect, createContext } from "react"
import { api } from "../config/api"
import type { UserApiType } from "../types/user";
import { socket } from "../config/socket";

type AuthContextType = {
    token: null | string;
    user: UserApiType | null;
    isLoading: boolean;
    login: (newToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<UserApiType | null>(null)

    useEffect(() => {
        if(token) {
            const formatedToken = `Bearer ${token}`
            api.defaults.headers.common["Authorization"] = formatedToken

            socket.auth = { token: formatedToken }

            socket.connect()

            socket.on("error", (err) => {
                alert(err.message);
            });

            return () => {
                socket.disconnect();
                socket.off("error");
            };
        } else {
            delete api.defaults.headers.common["Authorization"]
            socket.disconnect()
        }
    }, [token])

    useEffect(() => {
        const initalizeAuth = async () => {
            setIsLoading(true)
            try {
                const refreshResponse = await api.post("auth/refresh", {}, {
                    headers: {
                        "x-skip-refresh": "true"
                    }
                })
                const newAccessToken = refreshResponse.data.accessToken
                setToken(newAccessToken)

                api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`
                const userResponse = await api.get("/auth/me")
                setUser(userResponse.data)
            } catch (err) {
                console.warn("No active session")
            } finally {
                setIsLoading(false)
            }
        }

        initalizeAuth()
    }, [])

    const login = async (newToken: string) => {
        setIsLoading(true)
        try {
            setToken(newToken)
            const userResponse = await api.get("/auth/me", {
                headers: { Authorization: `Bearer ${newToken}` }
            })
            setUser(userResponse.data)
        } catch (err) {
            console.error("Connexion error")
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        setIsLoading(true)
        try {
            await api.post("/auth/logout")
        } catch (err) {
            console.error("Error when disconnecting on the server side")
        } finally {
            setToken(null)
            setUser(null)
            setIsLoading(false)
        }
    }

    const value = {
        token,
        user,
        isLoading,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}