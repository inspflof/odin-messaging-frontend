import { useState } from "react";
import { useSearchUser } from "../hooks/useSearchUser";
import type { User } from "../../../types/user";

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Conversation title : </label>
            <input 
                type="text"
                id="name" 
                name="name"
            />
            <label htmlFor="users">Users : </label>
            <input 
                id="users"
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <div>
                {safeSearchList.map(user => (
                    <div key={user.id}>
                        <div>
                            <div>{user.displayName}</div>
                            <p>{user.username}</p>
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
            <div>
                {userList.map(user => (
                    <div key={user.id}>{user.displayName}</div>
                ))}
            </div>
            <button type="submit">Create</button>
        </form>
    )
}