import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { getUser } from "@/lib/helpers/getUser";

export const Route = createFileRoute('/_authed')({
  component: AuthedLayout,
  beforeLoad: async () => {
    const user  = await getUser()
    if (!user) {
      console.error("Auth check failed:", 400)
      throw redirect({ to: "/auth/login" })
    }
    return { user }
  },
  
})

function AuthedLayout() {
  const { user } = Route.useRouteContext()
  return (
    <div>
      <h1>Logged In User Area, welcome{ user.id }</h1>
      <Outlet />
    </div>
  )
}

