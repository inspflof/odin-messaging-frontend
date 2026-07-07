import { Link } from "@tanstack/react-router";

import styles from "./ConversationAddBtn.module.css"

export default function ConversationAddBtn() {
    return (
        <Link 
            to="/conversation"
            className={styles.btn}
        >Create conversation</Link>
    )
}