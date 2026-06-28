import { StrictMode } from 'react'
import ReactDom from "react-dom/client"
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './hooks/useAuth'

const  router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')!
if(!rootElement.innerHTML) {
    const root = ReactDom.createRoot(rootElement)
    root.render(
    <StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>
  )
}