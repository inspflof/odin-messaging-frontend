import { useNavigate } from "@tanstack/react-router"
import ConversationList from "./components/ConversationList"
import { useGetConversations } from "./hooks/useConversations"
import ConversationAddBtn from "./components/ConversationAddBtn"

import styles from "./ConversationsView.module.css"

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
        <div className={styles.main}>
            <div className={styles.controls}>
                <ConversationAddBtn />
            </div>
            <ConversationList 
                conversations={getConversations.data}
                handleClick={onConversationClick}
            /> 
        </div>
    )
}