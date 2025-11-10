import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { supabase } from '@/lib/supabase/supabase'
import { emailSchema, passwordSchema } from '@/lib/helpers/validators'

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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
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
              return result.success ? undefined : result.error.errors[0].message
            },
          }}
          children={(field) => (
            <>
              <input
                placeholder="Email"
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
              return result.success ? undefined : result.error.errors[0].message
            },
          }}
          children={(field) => (
            <>
              <input
                placeholder="Password"
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
      <button type="submit">Sign Up</button>
    </form>
  )
}
