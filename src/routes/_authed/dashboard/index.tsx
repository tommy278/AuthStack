import { createFileRoute } from '@tanstack/react-router'
import { Route as ParentRoute } from '@/routes/__root'

export const Route = createFileRoute('/_authed/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = ParentRoute.useRouteContext()
  return (
    <div>
      <p> You are {user ? user.id : 'Hello, world!'}</p>
    </div>
  )
}
