import { useNavigate } from '@tanstack/react-router'
import { logoutFn } from '@/lib/serverFunctions/logoutFn'
import { useUser } from '@/context/UserContext'

interface LogoutProps {
  onLogout?: () => void
}

export default function Logout({ onLogout }: LogoutProps) {
  const navigate = useNavigate()
  const { setUser } = useUser()

  const handleLogout = async () => {
    const { error, message } = await logoutFn()
    if (error) {
      console.error(message)
    } else {
      setUser(null)
      if (onLogout) onLogout()
      navigate({ to: '/auth/login' })
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex cursor-pointer items-center gap-3 rounded-lg bg-red-500 p-3 transition-colors transition-transform duration-150 hover:scale-105"
    >
      Sign Out
    </button>
  )
}
