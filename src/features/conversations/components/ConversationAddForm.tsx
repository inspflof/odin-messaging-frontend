import { useState } from "react";
import { useSearchUser } from "../hooks/useSearchUser";
import type { User } from "../../../types/user";

import styles from "./ConversationAddForm.module.css"

type Props = {
    userList: User[];
    addUser: (user: User) => void;
    handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function ConversationAddForm({
    userList,
    addUser,
    handleSubmit,
}:Props) {
    const [userInput, setUserInput] = useState<string>("")

    const { data: searchList = [] } = useSearchUser(userInput)
    const safeSearchList = searchList.filter(
        user => !userList.some(
            addedUser => addedUser.id === user.id
        )
    )

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.header}>
                <h2>New conversation</h2>
                <p>Name the thread and add the people in it.</p>
            </div>
            {userList.length > 2 && (
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Title : </label>
                    <input 
                        type="text"
                        id="name" 
                        name="name"
                        placeholder=""
                    />
                </div>
            )}
            <div className={styles.inputGroup}>
                <label htmlFor="users">Users : </label>
                <input 
                    id="users"
                    type="text" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    />
                {userInput && safeSearchList.length > 0 && (
                <div className={styles.resultUsers}>
                        {safeSearchList.map(user => (
                            <div className={styles.result} key={user.id}>
                                <div>
                                    <div>{user.displayName}</div>
                                    <p>#{user.username}</p>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        addUser(user)
                                        setUserInput("")
                                    }}
                                >Add</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {userInput && safeSearchList.length === 0 && (
                <div className={styles.resultUsers}>
                    No match found...
                </div>
            )}
            <div className={styles.userList}>
                {userList.map(user => (
                    <div key={user.id}>{user.displayName}</div>
                ))}
            </div>
            <div className={styles.create}>
                <button type="submit">Create</button>
            </div>
        </form>
    )
}