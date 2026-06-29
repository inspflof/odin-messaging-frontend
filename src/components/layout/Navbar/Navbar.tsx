import { Link } from "@tanstack/react-router";
import { useAuth } from "../../../hooks/useAuth";

import styles from "./Navbar.module.css"

export default function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav className={styles.navbar}>
            <Link to="/">Home</Link>
            <div>
                {user && (
                    <button onClick={logout}>Logout</button>
                )}
                {!user && (
                    <Link to="/auth">Login</Link>
                )}
            </div>
        </nav>
    )
}