import type { Conversation } from "../../../types/conversation"
import ConversationCard from "./ConversationCard"

type Props = {
    conversations: Conversation[];
    handleClick: (conversationId: string) => void;
}

export default function ConversationList({
    conversations,
    handleClick,
}: Props) {
    return (
        <div>
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