"use server"

import { redirect } from "next/navigation"
import { createClient } from "../lib/supabase/server"

export async function signUp(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string
  const full_name = (formData.get('full_name') as string) || (formData.get('username') as string)

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, full_name }
    }
  })

  if (error) return { error: error.message }
  
  console.log(user)
  redirect('/home')
}


export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: error.message }

  redirect('/home')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/landing-page')
}


