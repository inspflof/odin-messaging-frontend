import { StrictMode } from 'react'
import ReactDom from "react-dom/client"
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './hooks/useAuth'
import "./style/global.css"

const router = createRouter({ 
    routeTree,
    context : {
        auth: undefined! as ReturnType<typeof useAuth>
    } 
})

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient()

function InnerApp() {
    const auth = useAuth()

    if(auth.isLoading) {
        return <div>Loading...</div>
    }

    return <RouterProvider router={router} context={{ auth }} />
}

const rootElement = document.getElementById('root')!
if(!rootElement.innerHTML) {
    const root = ReactDom.createRoot(rootElement)
    root.render(
    <StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <InnerApp />
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>
  )
}