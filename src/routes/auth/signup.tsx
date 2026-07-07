import { createFileRoute } from '@tanstack/react-router'
import Signup from '../../features/auth/SignUp'

export const Route = createFileRoute('/auth/signup')({
    component: RouteComponent,
    validateSearch: (search) => ({
        redirect: (search.redirect as string) || "/"
    })
})

function RouteComponent() {
  return (
    <Signup />
  )
}
