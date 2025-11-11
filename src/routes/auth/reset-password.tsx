import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/supabase'
import { useNavigate } from '@tanstack/react-router'
import { useUser } from '@/context/UserContext'
import { passwordSchema } from '@/lib/helpers/validators'

export const Route = createFileRoute('/auth/reset-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const [sessionReady, setSessionReady] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useUser()

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error fetching session:', error)
        alert('Something went wrong checking the session')
        return
      }

      if (data.session) {
        setSessionReady(true)
      } else {
        alert(
          'Session not found. Please use the password reset link from your email.'
        )
      }
    }
    checkSession()
  }, [])

  interface Passwords {
    newPassword: string
    confirmPassword: string
  }

  const defaultPasswords: Passwords = { newPassword: '', confirmPassword: '' }

  const passwordForm = useForm({
    defaultValues: defaultPasswords,
    onSubmit: async ({ value, formApi }) => {
      if (value.newPassword === value.confirmPassword) {
        const { error } = await supabase.auth.updateUser({
          password: value.newPassword,
        })
        formApi.reset()

        if (error) {
          console.log(error)
          alert('Something went wrong updating password')
        } else {
          alert('Password successfully updated. You can log in now.')
          setUser(null)
          navigate({ to: '/auth/login' })
        }
      } else {
        console.error('Passwords do not match')
        alert('Passwords do not match')
        return
      }
    },
  })

  if (!sessionReady) {
    return <p>Checking session...</p>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          passwordForm.handleSubmit()
        }}
        className="form-content"
      >
        <h1 className="flex justify-center text-3xl font-semibold">
          Reset password
        </h1>
        <div>
          <passwordForm.Field
            name="newPassword"
            validators={{
              onChange: ({ value }) => {
                const result = passwordSchema.safeParse(value)
                return result.success
                  ? undefined
                  : result.error.errors[0].message
              },
            }}
            children={(field) => (
              <>
                <input
                  placeholder="New Password"
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`input-field ${
                    field.state.meta.errors.length > 0
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {field.state.meta.errors.map((error, i) => (
                  <div key={i} className="text-red-500">
                    {error}
                  </div>
                ))}
              </>
            )}
          />
        </div>
        <div>
          <passwordForm.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value }) => {
                if (value !== passwordForm.getFieldValue('newPassword')) {
                  return 'Passwords do not match'
                }
                return undefined
              },
            }}
            children={(field) => (
              <>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`input-field ${
                    field.state.meta.errors.length > 0
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {field.state.meta.errors.map((error, i) => (
                  <div key={i} className="text-red-500">
                    {error}
                  </div>
                ))}
              </>
            )}
          />
        </div>
        <button type="submit" className="button-primary">
          Reset Password
        </button>
      </form>
    </div>
  )
}
