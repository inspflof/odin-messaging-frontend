import type React from "react"

type Props = {
    handleSignUp: (e: React.SubmitEvent<HTMLFormElement>) => void;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
    credentials: { displayName: string, username: string, password: string },
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SignupForm({
    handleSignUp,
    isPending,
    isError,
    error,
    handleInputChange,
    credentials
}: Props) {

    return (
        <form onSubmit={handleSignUp}>
            <label htmlFor="displayName">Display name : </label>
            <input 
                type="text" 
                name="displayName"
                value={credentials.displayName}
                onChange={handleInputChange}
                id="displayName"
            />
            <label htmlFor="username">Username : </label>
            <input 
                type="text" 
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                id="username"
            />
            <label htmlFor="password">Password : </label>
            <input 
                type="password" 
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                id="password"
            />
            <button 
                type="submit"
                disabled={isPending}
            >
                {isPending && "Loading..."}
                {!isPending && "Sign Up"}
            </button>
            <div>
                {isError && (
                    <div>
                        {error?.message}
                    </div>
                )}
            </div>
        </form>
    )
}