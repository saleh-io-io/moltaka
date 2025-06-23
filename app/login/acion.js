'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

//login as annonymous user
export async function loginAsAnonymous(username) {
  if (!username) {
    console.error('Username is required for anonymous login')
    redirect('/error')
  }


  const supabase = await createClient()
  const { error } = await supabase.auth.signInAnonymously({
  })
}


export async function loginWithGithub() {
  const supabase = await createClient()

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`
    }
  })

  if (error) {
    redirect('/error')
  }

  redirect(data.url)
}


export async function signup(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Signup error:', error)
    console.error('error',)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

//function to check if the user is logged in
export async function isLoggedIn() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error fetching user:', error)
    return false
  }

  return !!user
}


export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}