"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// ─── Browse Tournament ───────────────────────────────────────────────
export async function getTournaments(gameCategory?: string) {
    const supabase = await createClient()

    let query = supabase
        .from("tournaments")
        .select(`*, profiles:organizer_id ( id, username )`)
        .in("status", ["approved", "ongoing", "completed"])
        .order("created_at", { ascending: false })

    if (gameCategory && gameCategory !== "all") {
        query = query.eq("game_category", gameCategory)
    }

    const { data, error } = await query

    if (error) {
        console.error("getTournaments error:", error.message)
        return []
    }

    const now = new Date()
    return (data || []).map(t => {
        if (t.status === "rejected") return t
        let dynamicStatus = t.status
        if (t.tournament_end && now > new Date(t.tournament_end)) dynamicStatus = "completed"
        else if (t.tournament_start && now >= new Date(t.tournament_start)) dynamicStatus = "ongoing"
        return { ...t, status: dynamicStatus }
    })
}

// ─── Detail Tournament ──────────────────────────────────────────────
export async function getTournamentById(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("tournaments")
        .select(`*, profiles:organizer_id ( id, username )`)
        .eq("id", id)
        .single()

    if (error) return null
    return data
}

// ─── Buat Tournament Baru ───────────────────────────────────────────
export async function createTournament(formData: {
    name: string
    game_category: string
    description?: string
    prize_pool?: string
    max_slots: number
    registration_start?: string
    registration_end?: string
    tournament_start?: string
    tournament_end?: string
    google_form_url: string
    banner_url: string
}) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Kamu harus login terlebih dahulu." }

    const { error } = await supabase
        .from("tournaments")
        .insert({
            name: formData.name,
            game_category: formData.game_category,
            description: formData.description || null,
            prize_pool: formData.prize_pool || null,
            max_slots: formData.max_slots,
            current_slots: 0,
            google_form_url: formData.google_form_url,
            banner_url: formData.banner_url,
            registration_start: formData.registration_start || null,
            registration_end: formData.registration_end || null,
            tournament_start: formData.tournament_start || null,
            tournament_end: formData.tournament_end || null,
            payment_confirmed: false,
            organizer_id: user.id,
            status: "pending",
        })

    if (error) {
        console.error("createTournament error:", error.message)
        return { error: error.message }
    }

    revalidatePath("/home/tournament")
    return { error: null }
}

// ─── Tournament milik user yang login ──────────────────────────────
export async function getMyTournaments() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
        .from("tournaments")
        .select("id, name, game_category, prize_pool, max_slots, current_slots, tournament_start, status, created_at")
        .eq("organizer_id", user.id)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("getMyTournaments error:", error.message)
        return []
    }

    return data || []
}

// ─── Register ke Tournament ─────────────────────────────────────────
export async function registerTournament(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    const tournamentId = formData.get("tournament_id") as string
    const teamId = formData.get("team_id") as string
    const screenshotFile = formData.get("screenshot") as File

    if (!screenshotFile || screenshotFile.size === 0) {
        return { error: "Screenshot bukti pengisian form wajib diupload" }
    }

    const fileExt = screenshotFile.name.split(".").pop()
    const fileName = `${tournamentId}/${teamId}_${Date.now()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from("form-screenshots")
        .upload(fileName, screenshotFile)

    if (uploadError) {
        console.error("Upload error:", uploadError.message)
    }

    const screenshotUrl = uploadData
        ? supabase.storage.from("form-screenshots").getPublicUrl(fileName).data.publicUrl
        : "screenshot_pending"

    const { error } = await supabase
        .from("tournament_registrations")
        .insert({
            tournament_id: tournamentId,
            team_id: teamId,
            registered_by: user.id,
            form_screenshot_url: screenshotUrl,
        })

    if (error) {
        if (error.code === "23505") return { error: "Tim kamu sudah terdaftar di tournament ini" }
        return { error: error.message }
    }

    revalidatePath(`/home/tournament/${tournamentId}`)
    return { success: true }
}

// ─── Histori Registrasi ─────────────────────────────────────────────
export async function getMyRegistrations() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data } = await supabase
        .from("tournament_registrations")
        .select(`
            *,
            tournaments:tournament_id ( id, name, game_category, banner_url ),
            teams:team_id ( id, name )
        `)
        .eq("registered_by", user.id)
        .order("registered_at", { ascending: false })

    return data || []
}

// ─── Cek apakah tim sudah terdaftar ────────────────────────────────
export async function checkRegistration(tournamentId: string, teamId: string) {
    const supabase = await createClient()

    const { data } = await supabase
        .from("tournament_registrations")
        .select("id, status")
        .eq("tournament_id", tournamentId)
        .eq("team_id", teamId)
        .maybeSingle()

    return data
}