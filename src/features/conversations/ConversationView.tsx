import { useParams } from "@tanstack/react-router"
import { useAddMessage, useGetMessages } from "./hooks/useConversations"
import { useAuth } from "../../hooks/useAuth"
import MessageList from "./components/MessageList"
import MessageAdd from "./components/MessageAdd"
import { useState } from "react"

import styles from "./ConversationView.module.css"

export default function ConversationView() {
    const { conversationId } = useParams({ from: "/conversation/$conversationId" })
    const messageApi = useGetMessages(conversationId)
    const auth = useAuth()
    const sendMessageApi = useAddMessage()

    const [message, setMessage] = useState<string>("")

    function handleSendMessage(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if(!message.trim()) return

        setMessage("")
        sendMessageApi.mutateAsync({ 
            conversationId,
            message
        })
    }

    function handleChangeMessage(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.currentTarget
        setMessage(value)
    }

    if(!auth.user) return (
        <div>Acces denied</div>
    )

    if(messageApi.isPending) return (
        <div>Loading...</div>
    )

    if(messageApi.isError) return (
        <div>{messageApi.error.message}</div>
    )

    if(!messageApi.data) return (
        <div>No message, write the first</div>
    )

    return (
        <div className={styles.conversation}>
            <MessageList 
                currentUserId={auth.user.id}
                messages={messageApi.data}
            />
            <MessageAdd 
                onSubmit={handleSendMessage}
                onChange={handleChangeMessage}
                isLoading={sendMessageApi.isPending}
                message={message}
            />
        </div>
    )
}