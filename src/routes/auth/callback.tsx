import { createFileRoute } from '@tanstack/react-router'
import { setSessionFn } from '@/lib/serverFunctions/setSessionFn'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/supabase'
import { useUser } from '@/context/UserContext'

export const Route = createFileRoute('/auth/callback')({
  component: CallbackPage,
})

export default function CallbackPage() {
  const navigate = useNavigate()
  const { setUser } = useUser()

  useEffect(() => {
    const handleOauth = async () => {
      const hash = new URLSearchParams(window.location.hash.slice(1))
      const access_token = hash.get('access_token')
      const refresh_token = hash.get('refresh_token')

      if (access_token && refresh_token) {
        await setSessionFn({ data: { access_token, refresh_token } })

        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          setUser(user)
          navigate({ to: '/dashboard' })
        } else {
          console.error('No user found after Oauth login')
          navigate({ to: '/auth/login' })
        }
      } else {
        console.error('No Oauth tokens found')
        navigate({ to: '/auth/login' })
      }
    }
    handleOauth()
  }, [navigate])

  return <div>Redirecting...</div>
}
