import type { Message } from "../../../types/message"

type Props = {
    message: Message;
    currentUserId: string;
}

export default function MessageCard({
    message,
    currentUserId
}:Props) {
    return (
        <div>
            {message.content}
        </div>
    )
}