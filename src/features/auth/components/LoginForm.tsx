import type React from "react"

type Props = {
    handleLogin: (e: React.SubmitEvent<HTMLFormElement>) => void;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
    credentials: { username: string, password: string },
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginForm({
    handleLogin,
    isPending,
    isError,
    error,
    handleInputChange,
    credentials
}: Props) {

    return (
        <form onSubmit={handleLogin}>
            {isError && (
                <div>
                    {error?.message}
                </div>
            )}
            <input 
                type="text" 
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
            />
            <input 
                type="password" 
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
            />
            <button 
                type="submit"
                disabled={isPending}
            >
                {isPending && "Loading..."}
                {!isPending && "Login"}
            </button>
        </form>
    )
}