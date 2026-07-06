import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/conversation/$conversationId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/conversation/$conversationId"!</div>
}
