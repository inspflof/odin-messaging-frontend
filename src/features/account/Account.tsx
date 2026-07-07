import React, { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import type { UserApiType } from "../../types/user"
import AccountDetail from "./components/AccountDetail"
import useEdit from "./hooks/useEdit"

export default function Account() {
    const auth = useAuth()
    const [user, setUser] = useState<UserApiType | null>(null)
    const editApi = useEdit()

    useEffect(() => {
        setUser(auth.user)
    }, [auth.user])

    function handleCancel() {
        setUser(auth.user)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target

        setUser(prev => {
            if(!prev) return prev
            
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        await editApi.mutateAsync({ displayName: user?.displayName, username: user?.username })
    }

    if(auth.isLoading) return (
        <div>Loading...</div>
    )

    if(!auth.user || !user) return (
        <div>No user...</div>
    )

    return (
        <>
            <button onClick={auth.logout}>Logout</button>
            <AccountDetail 
                user={user}
                handleCancel={handleCancel}
                handleChange={handleChange}
                hanleSubmit={handleSubmit}
                isLoading={editApi.isPending}
            />
        </>
    )
}