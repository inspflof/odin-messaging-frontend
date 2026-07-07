import { useParams } from "@tanstack/react-router"
import { useGetMessages } from "./hooks/useConversations"
import { useAuth } from "../../hooks/useAuth"
import MessageList from "./components/MessageList"

export default function ConversationView() {
    const { conversationId } = useParams({ from: "/conversation/$conversationId" })
    const messageApi = useGetMessages(conversationId)
    const auth = useAuth()

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
        <div>
            <MessageList 
                currentUserId={auth.user.id}
                messages={messageApi.data}
            />
        </div>
    )
}