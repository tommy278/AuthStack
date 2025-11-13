// src/context/UserContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'

interface UserContextValue {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
})

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode
  initialUser: User | null
}) {
  const [user, setUser] = useState<User | null>(initialUser)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
