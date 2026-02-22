"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// ─── Buat Tim Baru ──────────────────────────────────────────────────
export async function createTeam(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    // Cek apakah user sudah punya tim
    const { data: existingMember } = await supabase
        .from("team_members")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle()

    if (existingMember) return { error: "Kamu sudah tergabung dalam tim lain" }

    const name = formData.get("name") as string
    const description = (formData.get("description") as string) || null

    const { data, error } = await supabase
        .from("teams")
        .insert({ name, description, leader_id: user.id })
        .select("id")
        .single()

    if (error) return { error: error.message }

    revalidatePath("/home/team")
    return { success: true, teamId: data.id }
}

// ─── Ambil Tim Saya (+ anggota) ─────────────────────────────────────
export async function getMyTeam() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // Cari team membership
    const { data: membership } = await supabase
        .from("team_members")
        .select("team_id")
        .eq("user_id", user.id)
        .maybeSingle()

    if (!membership) return null

    // Ambil team + semua members + profile
    const { data: team } = await supabase
        .from("teams")
        .select(`
      *,
      team_members (
        id, user_id, role, joined_at,
        profiles:user_id ( id, username, avatar_url, full_name )
      )
    `)
        .eq("id", membership.team_id)
        .single()

    return team
}

// ─── Cari User (untuk undangan) ─────────────────────────────────────
export async function searchUsers(query: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    if (!query || query.trim().length < 2) return []

    const { data } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, full_name")
        .ilike("username", `%${query}%`)
        .neq("id", user.id)
        .limit(10)

    return data || []
}

// ─── Kirim Undangan ─────────────────────────────────────────────────
export async function inviteUser(teamId: string, userId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    // Cek apakah user sudah punya tim
    const { data: existingMember } = await supabase
        .from("team_members")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle()

    if (existingMember) return { error: "User ini sudah tergabung di tim lain" }

    const { error } = await supabase
        .from("team_invitations")
        .insert({
            team_id: teamId,
            invited_user_id: userId,
            invited_by: user.id,
        })

    if (error) {
        if (error.code === "23505") return { error: "Undangan sudah pernah dikirim" }
        return { error: error.message }
    }

    revalidatePath("/home/team")
    return { success: true }
}

// ─── Ambil Undangan Masuk ───────────────────────────────────────────
export async function getMyInvitations() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data } = await supabase
        .from("team_invitations")
        .select(`
      id, status, created_at,
      teams:team_id ( id, name, logo_url ),
      inviter:invited_by ( username, avatar_url )
    `)
        .eq("invited_user_id", user.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false })

    return data || []
}

// ─── Terima Undangan ────────────────────────────────────────────────
export async function acceptInvitation(invitationId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    const { error } = await supabase.rpc("accept_team_invitation", {
        invitation_id: invitationId,
    })

    if (error) return { error: error.message }

    revalidatePath("/home/team")
    return { success: true }
}

// ─── Tolak Undangan ─────────────────────────────────────────────────
export async function declineInvitation(invitationId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    const { error } = await supabase
        .from("team_invitations")
        .update({ status: "declined" })
        .eq("id", invitationId)
        .eq("invited_user_id", user.id)

    if (error) return { error: error.message }

    revalidatePath("/home/team")
    return { success: true }
}

// ─── Keluar dari Tim ────────────────────────────────────────────────
export async function leaveTeam() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    // Cek apakah user adalah leader
    const { data: membership } = await supabase
        .from("team_members")
        .select("id, role")
        .eq("user_id", user.id)
        .maybeSingle()

    if (!membership) return { error: "Kamu tidak tergabung di tim manapun" }
    if (membership.role === "leader") return { error: "Leader tidak bisa keluar dari tim. Hapus tim jika ingin meninggalkan." }

    const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", membership.id)

    if (error) return { error: error.message }

    revalidatePath("/home/team")
    return { success: true }
}

// ─── Hapus Tim (hanya leader) ───────────────────────────────────────
export async function deleteTeam(teamId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    const { error } = await supabase
        .from("teams")
        .delete()
        .eq("id", teamId)
        .eq("leader_id", user.id)

    if (error) return { error: error.message }

    revalidatePath("/home/team")
    return { success: true }
}

// ─── Kick Member (hanya leader) ─────────────────────────────────────
export async function kickMember(memberId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    // Verify caller is leader of the team containing this member
    const { data: member } = await supabase
        .from("team_members")
        .select("id, team_id, role")
        .eq("id", memberId)
        .single()

    if (!member) return { error: "Member tidak ditemukan" }
    if (member.role === "leader") return { error: "Tidak bisa mengeluarkan leader" }

    const { data: team } = await supabase
        .from("teams")
        .select("leader_id")
        .eq("id", member.team_id)
        .single()

    if (team?.leader_id !== user.id) return { error: "Hanya leader yang bisa mengeluarkan anggota" }

    const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", memberId)

    if (error) return { error: error.message }

    revalidatePath("/home/team")
    return { success: true }
}
