import type React from "react"

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
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                name="message"
                onChange={onChange}
                value={message}
            />
            <button 
                type="submit"
                disabled={isLoading}
            >Send</button>
        </form>
    )
}