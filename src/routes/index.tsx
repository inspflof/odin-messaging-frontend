import { createFileRoute } from '@tanstack/react-router'
import ConversationsView from '../features/conversations/ConversationsView'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
        <ConversationsView />
    </>
  )
}
