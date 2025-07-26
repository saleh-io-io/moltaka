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
  console.log('Logging in as anonymous user with username:', username)
  if (!username) {
    console.log('Username is required for anonymous login')
    redirect('/error')
  }

  const supabase = await createClient()

  // Sign in anonymously
  const { error: signInError } = await supabase.auth.signInAnonymously()

  if (signInError) {
  console.log('Anonymous login error:', signInError)
    redirect('/error')
  }

  // Get the current user
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user?.id) {
    console.log('Failed to get user after login:', userError)
    redirect('/error')
  }

  const userId = userData.user.id

  // Update user metadata
  await supabase.auth.updateUser({
    data: {
      full_name: username,
    }
  })

  // Update your users table
 const {error} =  await supabase.from('attendees').update({
    name: username,
  }).eq('uuid', userId)

  if (error) {
    console.log('Error updating user in database:', error)
    redirect('/error')
  }

  console.log('User ID:', userId)
  return userId

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
    console.log('Signup error:', error)
    console.log('error',)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
export async function loginWithEmailAndPassword(email, password) {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    console.log('Login error:', error)
    redirect('/error')
  }
  
 redirect('/')
}

//function to check if the user is logged in
export async function isLoggedIn() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.log('Error fetching user:', error)
    return false
  }

  return !!user
}



export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log('Logout error:', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}