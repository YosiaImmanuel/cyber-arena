// app/(protected)/profile/ProfileClient.tsx
"use client"
import { useState } from "react"
import { updateProfile } from "@/actions/profile"
import { User, Users, Trophy, Edit3, Check, X } from "lucide-react"
import { Profile, RegistrationWithDetails, Team, TeamMember } from "@/lib/supabase/type"

interface Props {
  profile: Profile
  email: string
  teamMember: (TeamMember & { teams: Team }) | null
  registrations: RegistrationWithDetails[]
}

export default function ProfileClient({ profile, email, teamMember, registrations }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await updateProfile(formData)

    if (result?.error) {
      setError(result.error)
    } else {
      setIsEditing(false)
    }
    setLoading(false)
  }

  const statusColor: Record<string, string> = {
    approved: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    pending:  "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    rejected: "text-red-400 bg-red-400/10 border-red-400/20",
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header Card */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-violet-900/40">
              {profile?.username?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{profile?.username}</h1>
              <p className="text-sm text-gray-400">{email}</p>
              {teamMember && (
                <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                  <Users size={11} />
                  {teamMember.role === "leader" ? "Leader" : "Member"} · {teamMember.teams?.name}
                </span>
              )}
            </div>
          </div>

          {/* Edit toggle */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/[0.08] hover:border-violet-500/30 hover:bg-violet-500/10 transition-all duration-200"
          >
            <Edit3 size={14} />
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Form Edit */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Username</label>
              <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] focus-within:border-violet-500/50 rounded-xl px-3 h-11 transition-colors">
                <User size={15} className="text-gray-500 shrink-0" />
                <input
                  name="username"
                  defaultValue={profile?.username}
                  className="bg-transparent text-white text-sm flex-1 outline-none placeholder:text-gray-600"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
              <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] focus-within:border-violet-500/50 rounded-xl px-3 h-11 transition-colors">
                <User size={15} className="text-gray-500 shrink-0" />
                <input
                  name="full_name"
                  defaultValue={profile?.full_name}
                  className="bg-transparent text-white text-sm flex-1 outline-none placeholder:text-gray-600"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs flex items-center gap-1">
                <X size={12} /> {error}
              </p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:opacity-90 disabled:opacity-50 transition-all"
              >
                <Check size={14} />
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 border border-white/[0.08] hover:bg-white/[0.05] transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // Info display
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Username",  value: profile?.username  ?? "-" },
              { label: "Full Name", value: profile?.full_name ?? "-" },
              { label: "Email",     value: email },
              { label: "Member Since", value: new Date(profile?.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-medium text-white truncate">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Team Card */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <Users size={15} className="text-violet-400" />
          Team
        </h2>

        {teamMember ? (
          <div className="flex items-center gap-4 p-4 bg-violet-500/5 border border-violet-500/15 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center font-bold text-white shrink-0">
              {teamMember.teams?.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{teamMember.teams?.name}</p>
              <p className="text-xs text-gray-400">{teamMember.teams?.description ?? "No description"}</p>
            </div>
            <span className="text-xs font-semibold text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full capitalize shrink-0">
              {teamMember.role}
            </span>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 text-sm">
            Belum bergabung dengan tim.{" "}
            <a href="/team/create" className="text-violet-400 hover:underline">Buat tim</a>
          </div>
        )}
      </div>

      {/* Tournament History */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <Trophy size={15} className="text-violet-400" />
          Riwayat Tournament
        </h2>

        {registrations.length > 0 ? (
          <div className="space-y-3">
            {registrations.map((reg, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                  <Trophy size={15} className="text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{reg.tournaments?.name}</p>
                  <p className="text-xs text-gray-500">{reg.tournaments?.game_category}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize shrink-0 ${statusColor[reg.status] ?? "text-gray-400"}`}>
                  {reg.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 text-sm">
            Belum ada riwayat pendaftaran tournament.
          </div>
        )}
      </div>

    </div>
  )
}
