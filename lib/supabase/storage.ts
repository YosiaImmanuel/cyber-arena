"use client"
import { createClient } from "./client"

export async function uploadAvatar(userId: string, file: File) {
  const supabase = createClient()
  const ext = file.name.split(".").pop()
  const path = `${userId}/avatar.${ext}`

  const { error } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true })

  if (error) return { url: null, error: error.message }

  const { data } = supabase.storage.from("avatars").getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

export async function uploadTeamLogo(teamId: string, file: File) {
  const supabase = createClient()
  const ext = file.name.split(".").pop()
  const path = `${teamId}/logo.${ext}`

  const { error } = await supabase.storage
    .from("team-logos")
    .upload(path, file, { upsert: true })

  if (error) return { url: null, error: error.message }

  const { data } = supabase.storage.from("team-logos").getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

export async function uploadTournamentBanner(tournamentId: string, file: File) {
  const supabase = createClient()
  const ext = file.name.split(".").pop()
  const path = `${tournamentId}/banner.${ext}`

  const { error } = await supabase.storage
    .from("tournament-banners")
    .upload(path, file, { upsert: true })

  if (error) return { url: null, error: error.message }

  const { data } = supabase.storage.from("tournament-banners").getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

export async function uploadFormScreenshot(registrationId: string, file: File) {
  const supabase = createClient()
  const ext = file.name.split(".").pop()
  const path = `${registrationId}/screenshot.${ext}`

  const { error } = await supabase.storage
    .from("form-screenshots")
    .upload(path, file, { upsert: true })

  if (error) return { url: null, error: error.message }

  // form-screenshots bucket private, pakai signed URL
  const { data } = await supabase.storage
    .from("form-screenshots")
    .createSignedUrl(path, 60 * 60) // URL valid 1 jam

  return { url: data?.signedUrl ?? null, error: null }
}