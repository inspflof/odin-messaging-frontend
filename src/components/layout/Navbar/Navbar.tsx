import { Link } from "@tanstack/react-router";
import { useAuth } from "../../../hooks/useAuth";

import styles from "./Navbar.module.css"

export default function Navbar() {
    const { user } = useAuth()

    return (
        <nav className={styles.navbar}>
            <Link 
                className={styles.link} 
                to="/"
            >Home</Link>
            <div>
                {user && (
                    <>
                        <Link 
                            to="/account"
                            className={styles.link}
                        >Account</Link>
                    </>
                )}
                {!user && (
                    <Link to="/auth" search={{ redirect: "/" }}>Login</Link>
                )}
            </div>
        </nav>
    )
}