import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { supabase } from '@/lib/supabase/supabase'
import { loginFn } from '@/lib/serverFunctions/loginFn'
import { useUser } from '@/context/UserContext'
import { Link } from '@tanstack/react-router'
import { emailSchema, passwordSchema } from '@/lib/helpers/validators'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

interface User {
  email: string
  password: string
}

const loggedInUser: User = { email: '', password: '' }

function RouteComponent() {
  const navigate = useNavigate()
  const { setUser } = useUser()
  const form = useForm({
    defaultValues: loggedInUser,
    onSubmit: async ({ value, formApi }) => {
      console.log(value)
      const { error, message } = await loginFn({
        data: {
          email: value.email,
          password: value.password,
        },
      })
      if (error) {
        alert(message)
        console.error(message)
      } else {
        alert(message)
        formApi.reset()

        const {
          data: { user: loggedInUser },
        } = await supabase.auth.getUser()
        setUser(loggedInUser)

        navigate({ to: '/dashboard' })
      }
    },
  })
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="form-content"
      >
        <div>
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const result = emailSchema.safeParse(value)
                return result.success
                  ? undefined
                  : result.error.errors[0].message
              },
            }}
            children={(field) => (
              <>
                <input
                  placeholder="Email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="input-field"
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
          <form.Field
            name="password"
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
                  placeholder="Password"
                  className="input-field"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
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

        <div className="flex justify-end">
          <Link to="/auth/forgot-password" className="text-blue-400">
            Forgot Password?
          </Link>
        </div>

        <div className="button-primary flex justify-center">
          <button type="submit">Log in</button>
        </div>

        <div className="flex justify-between">
          <button
            className="inline-flex cursor-pointer rounded-md bg-blue-500 p-2"
            type="button"
            onClick={async () => {
              await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  redirectTo: 'http://localhost:3000/auth/callback',
                },
              })
            }}
          >
            <FcGoogle size={20} />
            <span className="ml-1 text-gray-200">Log in with Google</span>
          </button>
          <button
            type="button"
            className="inline-flex cursor-pointer rounded-md bg-gray-400 p-2"
            onClick={async () => {
              await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                  redirectTo: 'http://localhost:3000/auth/callback',
                },
              })
            }}
          >
            <FaGithub size={20} />
            <span className="ml-1 text-gray-200">Log in with Github</span>
          </button>
        </div>
        <div className="flex justify-center">
          <span className="mr-1">Don't have an account yet?</span>
          <Link to="/auth/register" className="text-blue-500">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}
