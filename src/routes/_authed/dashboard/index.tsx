import { createFileRoute } from '@tanstack/react-router'
import { Route as ParentRoute } from '@/routes/_authed'

export const Route = createFileRoute('/_authed/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = ParentRoute.useRouteContext()
  return (
    <div>
      <p> You are {user?.role}</p>
    </div>
  )
}
