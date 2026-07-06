import type React from "react"
import type { UserApiType } from "../../../types/user";

type Props = {
    hanleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCancel: () => void;    
    user: UserApiType;
    isLoading: boolean;
}

export default function AccountDetail({
    handleCancel,
    handleChange,
    hanleSubmit,
    user,
    isLoading
}:Props) {
    return (
        <form onSubmit={hanleSubmit}>
            <div>Profile</div>
            <label htmlFor="username">Username : </label>
            <input 
                type="text" 
                name="username" 
                id="username" 
                value={user.username}
                onChange={handleChange}
            />
            <label htmlFor="displayName">Display name : </label>
            <input 
                type="text" 
                name="displayName"
                id="displayName"
                value={user.displayName}
                onChange={handleChange}
            />
            <button 
                type="submit"
                disabled={isLoading}
            >{isLoading ? "Loading..." : "Save"}</button>
            <button 
                type="button"
                onClick={handleCancel}
            >Cancel</button>
        </form>
    )
}