import { useParams } from "@tanstack/react-router"
import { useAddMessage, useGetMessages } from "./hooks/useConversations"
import { useAuth } from "../../hooks/useAuth"
import MessageList from "./components/MessageList"
import MessageAdd from "./components/MessageAdd"
import { useEffect, useState } from "react"
import { socket } from "../../config/socket"
import { useQueryClient } from "@tanstack/react-query"

import styles from "./ConversationView.module.css"
import type { Message } from "../../types/message"

export default function ConversationView() {
    const { conversationId } = useParams({ from: "/conversation/$conversationId" })
    const messageApi = useGetMessages(conversationId)
    const auth = useAuth()
    const sendMessageApi = useAddMessage()
    const queryClient = useQueryClient()

    const [message, setMessage] = useState<string>("")

    async function handleSendMessage(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if(!message.trim()) return

        const res = await sendMessageApi.mutateAsync({ 
            conversationId,
            message
        })

        socket.emit("message", {
            conversationId,
            data: res.data            
        })
        
        setMessage("")
    }

    function handleChangeMessage(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.currentTarget
        setMessage(value)
    }

    useEffect(() => {
        socket.connect()

        socket.on("connect_error", (err) => {
            console.log(err.message)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        function onMessage(res: { data: Message[] }) {
            queryClient.setQueryData<Message[]>(
                ["messages", conversationId], 
                (old: Message[] = []) => [...old, ...res.data]
            )
        }

        socket.on("message", onMessage)
        
        return () => {
            socket.off("message", onMessage)
        }
    }, [conversationId, queryClient])

    useEffect(() => {
        socket.emit("join_conversation", conversationId)
    }, [conversationId])


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