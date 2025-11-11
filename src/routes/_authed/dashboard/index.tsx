import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@/context/UserContext'

export const Route = createFileRoute('/_authed/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useUser()
  return (
    <div>
      <p> You are {user?.role}</p>
    </div>
  )
}
