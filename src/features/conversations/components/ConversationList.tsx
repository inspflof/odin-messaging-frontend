import type { Conversation } from "../../../types/conversation"
import ConversationCard from "./ConversationCard"

import styles from "./ConversationList.module.css"

type Props = {
    conversations: Conversation[];
    handleClick: (conversationId: string) => void;
}

export default function ConversationList({
    conversations,
    handleClick,
}: Props) {
    return (
        <div className={styles.list}>
            {conversations.map(conversation => (
                <ConversationCard 
                    conversation={conversation}
                    key={conversation.id}
                    handleClick={handleClick}
                />
            ))}
        </div>
    )
}