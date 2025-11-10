import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from "@tanstack/react-form";
import { supabase } from "@/lib/supabase/supabase";
import FieldInfo from "@/components/FieldInfo";
import { loginFn } from "@/lib/serverFunctions/loginFn";
import { useUser } from "@/context/UserContext"

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

interface User {
    email: string;
    password: string;
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
            
            const { data: { user: loggedInUser } } = await supabase.auth.getUser()
            setUser(loggedInUser)
            
            navigate({ to: "/dashboard"})
        }
    } 
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
                    name="email"
                    validators = {{
                        onChange: ({value}) => 
                            !value.includes('@') ? "Invalid email format: must include @" : undefined 
                    }}
                    children = {(field) => (
                        <>
                            <input 
                                placeholder = "Email"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                />
            </div>
            <div>
                <form.Field
                    name="password"
                    validators = {{
                    onChange: ({ value}) => 
                        value.length < 5 ? "Password not long enough" : undefined
                    }}
                    children = {(field) => (
                        <>
                            <input
                                placeholder="Password"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                />
            </div>
            <button type="submit">Log in</button>
            <button 
                type="button"
                onClick={async () => {
                    await supabase.auth.signInWithOAuth({
                        provider: "google",
                        options: {
                            redirectTo: "http://localhost:3000/auth/callback"
                        }
                    })
                }}
            > Sign in with Google
            </button>
            <button 
                type="button"
                onClick={async () => {
                    await supabase.auth.signInWithOAuth({
                        provider: "github",
                        options: {
                            redirectTo: "http://localhost:3000/auth/callback"
                        }
                    })
                }}
            > Sign in with GitHub
            </button>
        </form>
    )
}
