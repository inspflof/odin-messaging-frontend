import { createFileRoute } from '@tanstack/react-router'
import ConversationAdd from '../../features/conversations/ConversationAdd'

export const Route = createFileRoute('/conversation/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ConversationAdd />
  )
}
