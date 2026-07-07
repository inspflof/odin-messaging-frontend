import { Link, useNavigate } from "@tanstack/react-router"
import ConversationList from "./components/ConversationList"
import { useGetConversations } from "./hooks/useConversations"

export default function ConversationsView() {
    const getConversations = useGetConversations()
    const navigate = useNavigate()

    function onConversationClick(conversationId: string) {
        navigate({ 
            to: "/conversation/$conversationId", 
            params: { conversationId }
        })
    }

    if(getConversations.isPending) return (
        <div>Loading...</div>
    )

    if(!getConversations.data) return (
        <div>No conversation...</div>
    )

    return (
        <>
            <Link to="/conversation">Add</Link>
            <ConversationList 
                conversations={getConversations.data}
                handleClick={onConversationClick}
            /> 
        </>
    )
}