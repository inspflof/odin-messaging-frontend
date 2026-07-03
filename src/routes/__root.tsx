import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import Navbar from "../components/layout/Navbar/Navbar";
import type { useAuth } from "../hooks/useAuth";

type MyRouterContext = {
    auth: ReturnType<typeof useAuth>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootComponent,
})

function RootComponent() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}