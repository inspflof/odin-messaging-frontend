import { createFileRoute, redirect } from '@tanstack/react-router'
import Account from '../features/account/Account'

export const Route = createFileRoute('/account')({
    beforeLoad: ({ context }) => {
        if(!context.auth.user) {
            throw redirect({
                to: "/auth",
                search: {
                    redirect: location.pathname + location.search
                }
            })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
  return (
    <Account />
  )
}
