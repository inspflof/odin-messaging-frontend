import clsx from "clsx";
import type { Message } from "../../../types/message"

import styles from "./MessageCard.module.css"

type Props = {
    message: Message;
    currentUserId: string;
}

export default function MessageCard({
    message,
    currentUserId
}:Props) {
    return (
        <div className={clsx(
            styles.message,
            currentUserId === message.userId ? styles.mine : styles.other
        )}>
            {message.content}
        </div>
    )
}