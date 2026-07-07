import { useEffect, useRef } from "react";
import type { Message } from "../../../types/message"
import MessageCard from "./MessageCard";

import styles from "./MessageList.module.css"

type Props = {
    messages: Message[];
    currentUserId: string;
}

export default function MessageList({
    messages,
    currentUserId
}:Props) {
    const listRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight 
        }
    }, [messages])

    return (
        <div ref={listRef} className={styles.list}>
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