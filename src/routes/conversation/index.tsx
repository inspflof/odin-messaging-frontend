import { createFileRoute, redirect } from '@tanstack/react-router'
import ConversationAdd from '../../features/conversations/ConversationAdd'

export const Route = createFileRoute('/conversation/')({
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
    <ConversationAdd />
  )
}
