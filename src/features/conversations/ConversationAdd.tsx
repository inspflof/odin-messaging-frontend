import { useState } from "react"
import ConversationAddForm from "./components/ConversationAddForm"
import type { User } from "../../types/user"
import { useCreateConversation } from "./hooks/useConversations"
import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "../../hooks/useAuth"

import styles from "./ConversationAdd.module.css"

export default function ConversationAdd() {
    const { user: currentUser } = useAuth()
    const [users, setUsers] = useState<User[]>(currentUser ? [currentUser] : [])
    const createConversation = useCreateConversation()
    const navigate = useNavigate()

    function onAddUser(user: User) {
        if(!currentUser) return

        setUsers(prev => {
            const ids = new Set(prev.map(u => u.id))

            const next = [...prev]

            if(!ids.has(currentUser.id)) {
                next.push(currentUser)
                ids.add(currentUser.id)
            }

            if(!ids.has(user.id)) {
                next.push(user)
            }

            return next
        })
    }

    async function onCreate(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get("name")
        
        const userIds = users.map(user => user.id)
        const res = await createConversation.mutateAsync({
            userIds,
            name: typeof name === "string" ? name : ""
        })

        navigate({
            to: "/conversation/$conversationId",
            params: {
                conversationId: res.data.id
            }
        })
    }

    return (
        <div className={styles.conversationAdd}>
            <ConversationAddForm 
                userList={users}
                addUser={onAddUser}
                handleSubmit={onCreate}
            />
        </div>
    )
}