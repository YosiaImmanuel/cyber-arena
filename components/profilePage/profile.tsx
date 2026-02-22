"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Users, Trophy, Edit3, Check, X, Loader2 } from "lucide-react"


interface TeamMemberWithTeam {
  role: string
  teams: {
    name: string
    description: string | null
  }
}

interface Registration {
  status: string
  tournaments: {
    name: string
    game_category: string
  } | null
}

export default function ProfileClient() {
  const [userId, setUserId] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [teamMember, setTeamMember] = useState<TeamMemberWithTeam | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [pageLoading, setPageLoading] = useState(true)

  const [isEditing, setIsEditing] = useState(false)
  const [editUsername, setEditUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Fetch semua data dari Supabase ──────────────────────────────────────────
  useEffect(() => {
    const fetchAll = async () => {
      const supabase = createClient()

      // 1. User auth
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setPageLoading(false); return }

      setUserId(user.id)
      setEmail(user.email ?? "")

      // 2. Profile — sumber kebenaran HANYA dari tabel profiles
      //    Kalau belum ada row, buat dulu (upsert) pakai fallback dari user_metadata
      const fallbackUsername =
        user.user_metadata?.username ||
        user.email?.split("@")[0] ||
        ""

      const { data: profile } = await supabase
        .from("profiles")
        .upsert(
          { id: user.id, username: fallbackUsername },
          { onConflict: "id", ignoreDuplicates: true } // hanya insert kalau belum ada, tidak overwrite
        )
        .select("username")
        .single()

      // Setelah upsert, fetch ulang untuk pastikan dapat nilai terbaru dari DB
      const { data: freshProfile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single()

      const name = freshProfile?.username || fallbackUsername
      setUsername(name)
      setEditUsername(name)

      // 3. Team member
      const { data: member } = await supabase
        .from("team_members")
        .select("role, teams(name, description)")
        .eq("user_id", user.id)
        .single()

      if (member) setTeamMember(member as TeamMemberWithTeam)

      // 4. Tournament registrations
      const { data: regs } = await supabase
        .from("registrations")
        .select("status, tournaments(name, game_category)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setRegistrations((regs as Registration[]) ?? [])
      setPageLoading(false)
    }

    fetchAll()
  }, [])

  // ── Handle edit submit ──────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const newUsername = editUsername.trim()

    if (!newUsername) {
      setError("Username tidak boleh kosong.")
      setLoading(false)
      return
    }

    const supabase = createClient()

    // Pakai upsert agar row pasti tersimpan meski belum ada sebelumnya
    const { error: upsertError } = await supabase
      .from("profiles")
      .upsert(
        { id: userId, username: newUsername },
        { onConflict: "id" } // kalau sudah ada → update, kalau belum → insert
      )

    if (upsertError) {
      setError(upsertError.message)
    } else {
      setUsername(newUsername) // update UI langsung
      setIsEditing(false)
    }

    setLoading(false)
  }

  const statusColor: Record<string, string> = {
    approved: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    pending:  "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    rejected: "text-red-400 bg-red-400/10 border-red-400/20",
  }

  const initials = username?.[0]?.toUpperCase() ?? "?"

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (pageLoading) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.06]" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-white/[0.06] rounded" />
                <div className="h-3 w-48 bg-white/[0.04] rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 p-4">

      {/* ── Profile Card ─────────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-violet-500/10 blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-violet-500/20 shrink-0">
              {initials}
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg leading-tight">
                {username || "—"}
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">{email}</p>
              {teamMember && (
                <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300">
                  <Users size={11} />
                  {teamMember.role === "leader" ? "Leader" : "Member"} · {teamMember.teams?.name}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setIsEditing(!isEditing)
              setEditUsername(username)
              setError(null)
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/[0.08] hover:border-violet-500/30 hover:bg-violet-500/10 transition-all duration-200 shrink-0"
          >
            {isEditing ? <X size={14} /> : <Edit3 size={14} />}
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="mt-5 border-t border-white/[0.06]" />

        <div className="mt-5">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Username
                </label>
                <input
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
                  placeholder="Enter username"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <X size={14} className="shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setError(null) }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 border border-white/[0.08] hover:bg-white/[0.05] transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Username", value: username || "—" },
                { label: "Email", value: email },
              ].map(({ label, value }) => (
                <div key={label} className="px-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                  <p className="text-sm text-white font-medium truncate">{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Team Card ──────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users size={15} className="text-violet-400" />
          <h3 className="text-sm font-semibold text-white">Team</h3>
        </div>

        {teamMember ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
              {teamMember.teams?.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{teamMember.teams?.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {teamMember.teams?.description ?? "No description"}
              </p>
            </div>
            <span className="ml-auto shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium capitalize bg-violet-500/10 border border-violet-500/20 text-violet-300">
              {teamMember.role}
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Belum bergabung dengan tim.{" "}
            <a href="/teams/create" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
              Buat tim
            </a>
          </p>
        )}
      </div>

      {/* ── Tournament History ────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={15} className="text-violet-400" />
          <h3 className="text-sm font-semibold text-white">Riwayat Tournament</h3>
        </div>

        {registrations.length > 0 ? (
          <div className="space-y-2">
            {registrations.map((reg, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{reg.tournaments?.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{reg.tournaments?.game_category}</p>
                </div>
                <span
                  className={`shrink-0 ml-3 px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${
                    statusColor[reg.status] ?? "text-gray-400 bg-gray-400/10 border-gray-400/20"
                  }`}
                >
                  {reg.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Belum ada riwayat pendaftaran tournament.</p>
        )}
      </div>

    </div>
  )
}