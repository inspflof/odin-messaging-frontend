import type { Conversation } from "../../../types/conversation"
import styles from "./ConversationCard.module.css"

type Props = {
    conversation: Conversation;
    handleClick: (conversationId: string) => void;
}

export default function ConversationCard({
    conversation,
    handleClick,
}:Props) {
    return (
        <div onClick={() => handleClick(conversation.id)} className={styles.card}>
            <div>{conversation.name ? conversation.name : conversation.users[0].displayName}</div>
        </div>
    )
}