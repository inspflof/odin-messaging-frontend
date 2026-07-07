import type { Message } from "../../../types/message"
import MessageCard from "./MessageCard";

type Props = {
    messages: Message[];
    currentUserId: string;
}

export default function MessageList({
    messages,
    currentUserId
}:Props) {
    return (
        <div>
            {messages.map(message => (
                <MessageCard 
                    message={message}
                    key={message.id}
                    currentUserId={currentUserId}
                />
            ))}
        </div>
    )
}