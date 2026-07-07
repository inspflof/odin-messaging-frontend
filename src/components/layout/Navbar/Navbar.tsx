import { Link, redirect, useLocation } from "@tanstack/react-router";
import { useAuth } from "../../../hooks/useAuth";

import styles from "./Navbar.module.css"
import clsx from "clsx";

export default function Navbar() {
    const { user } = useAuth()
    const { pathname } = useLocation()

    return (
        <nav className={clsx(
            styles.navbar,
            pathname.match(/\/conversation\/.+/) && styles.onConversation 
        )}>
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
                    <Link to="/auth" search={{ redirect: pathname }}>Login</Link>
                )}
            </div>
        </nav>
    )
}