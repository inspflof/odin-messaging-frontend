import { createFileRoute } from '@tanstack/react-router'
import Login from '../../features/auth/Login'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
  validateSearch: (search) => ({
    redirect: 
        typeof search.redirect === "string"
            ? search.redirect
            : "/"
  })
})

function RouteComponent() {
  return (
    <Login />
  )
}
