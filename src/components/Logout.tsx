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
      if (onLogout) onLogout() // close sidebar
      navigate({ to: '/auth/login' })
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-800"
    >
      Sign Out
    </button>
  )
}
