import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { supabase } from '@/lib/supabase/supabase'
import { emailSchema, passwordSchema } from '@/lib/helpers/validators'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

interface User {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const defaultUser: User = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function RouteComponent() {
  const form = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value, formApi }) => {
      if (value.password === value.confirmPassword) {
        const { error } = await supabase.auth.signUp({
          email: value.email,
          password: value.password,
        })

        if (error) {
          alert(error.message)
        } else {
          alert('SignUp successful')
          formApi.reset()
        }
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
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 3
                  ? 'Name must be at least 3 characters'
                  : undefined,
            }}
            children={(field) => (
              <>
                <input
                  className="input-field"
                  placeholder="Name"
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
                  type="password"
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
        <div>
          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value }) => {
                if (value !== form.getFieldValue('password')) {
                  return 'Passwords do not match'
                }
                return undefined
              },
            }}
            children={(field) => (
              <>
                <input
                  placeholder="Confirm Password"
                  className="input-field"
                  type="password"
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

        <button className="button-primary" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  )
}
