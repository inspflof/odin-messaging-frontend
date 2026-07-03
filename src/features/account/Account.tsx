import { useAuth } from "../../hooks/useAuth"

export default function Account() {
    const { user } = useAuth()

    return (
        <div>
            <div>
                <div>Username :</div>
                <div>{user?.username}</div>
            </div>
        </div>
    )
}