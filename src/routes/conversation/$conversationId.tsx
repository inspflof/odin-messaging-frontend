import { createFileRoute } from '@tanstack/react-router'
import ConversationView from '../../features/conversations/ConversationView'

export const Route = createFileRoute('/conversation/$conversationId')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ConversationView />
  )
}
