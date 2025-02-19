'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          returnTo: `${window.location.origin}/chat`
        }
      },
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <button
      onClick={user ? handleSignOut : handleSignIn}
      className={`shadow-none border-none ${!user ? "bg-fill-primary text-text-primary-button px-2 py-1.5 rounded-lg mr-2" : "" }`}
    >
      <span className='text-sm'>{user ? 'Logout' : 'Login'}</span>
    </button>
  )
}