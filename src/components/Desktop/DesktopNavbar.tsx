import { Link } from '@tanstack/react-router'
import { useUser } from '@/context/UserContext'
import Logout from '@/components/Logout'

export default function DesktopNavbar() {
  const { user } = useUser()

  return (
    <div className="flex hidden items-center md:block">
      <nav className="flex space-x-4">
        {user ? (
          <Logout />
        ) : (
          <>
            <Link
              to="/auth/login"
              className="flex items-center gap-3 rounded-lg border border-white p-3 transition-colors transition-transform duration-150 hover:scale-105 hover:bg-blue-700"
              activeProps={{
                className:
                  'flex items-center gap-3 p-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-colors border-none',
              }}
            >
              Log In
            </Link>
            <Link
              to="/auth/register"
              className="flex items-center gap-3 rounded-lg border border-white p-3 transition-colors transition-transform duration-150 hover:scale-105 hover:bg-blue-700"
              activeProps={{
                className:
                  'flex items-center gap-3 p-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-colors border-none',
              }}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}
