import { createFileRoute, redirect } from '@tanstack/react-router'
import ConversationView from '../../features/conversations/ConversationView'

export const Route = createFileRoute('/conversation/$conversationId')({
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
    <ConversationView />
  )
}
