import type React from "react"
import styles from "./MessageAdd.module.css"

type Props = {
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    message: string;
    isLoading: boolean
}

export default function MessageAdd({
    onSubmit,
    onChange,
    message,
    isLoading
}:Props) {
    return (
        <form 
            onSubmit={onSubmit}
            className={styles.form}
        >
            <input 
                type="text" 
                name="message"
                onChange={onChange}
                value={message}
                className={styles.message}
            />
            <button 
                type="submit"
                disabled={isLoading}
                className={styles.btn}
            >Send</button>
        </form>
    )
}