import { Link, useNavigate } from "@tanstack/react-router"
import ConversationList from "./components/ConversationList"
import useConversations from "./hooks/useConversations"

export default function ConversationsView() {
    const conversationApi = useConversations()
    const navigate = useNavigate()

    function onConversationClick(conversationId: string) {
        navigate({ 
            to: "/conversation/$conversationId", 
            params: { conversationId }
        })
    }

    if(conversationApi.getAll.isPending) return (
        <div>Loading...</div>
    )

    if(!conversationApi.getAll.data?.data) return (
        <div>No conversation...</div>
    )

    return (
        <>
            <Link to="/conversation">Add</Link>
            <ConversationList 
                conversations={conversationApi.getAll.data.data}
                handleClick={onConversationClick}
            /> 
        </>
    )
}