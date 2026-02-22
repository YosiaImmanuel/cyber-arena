"use server"

import { redirect } from "next/navigation"
import { createClient } from "../lib/supabase/server"

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string
  const full_name = (formData.get('full_name') as string) || username

  if (!username?.trim()) return { error: "Username tidak boleh kosong" }
  if (!email?.trim()) return { error: "Email tidak boleh kosong" }
  if (!password) return { error: "Password tidak boleh kosong" }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username: username.trim(), full_name: full_name.trim() }
    }
  })

  if (error) return { error: error.message }

  // Insert profile manual, tidak mengandalkan trigger
  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        username: username.trim(),
        full_name: full_name.trim(),
      })

    if (profileError) return { error: profileError.message }
  }

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


