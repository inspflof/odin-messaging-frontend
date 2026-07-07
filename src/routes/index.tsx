import { createFileRoute, redirect } from '@tanstack/react-router'
import ConversationsView from '../features/conversations/ConversationsView'

export const Route = createFileRoute('/')({
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
    <>
        <ConversationsView />
    </>
  )
}
