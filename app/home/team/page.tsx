"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getMyTeam, getMyInvitations, acceptInvitation, declineInvitation, leaveTeam, kickMember } from "@/actions/team"
import {
    Users, Crown, UserMinus, UserPlus, LogOut, Shield,
    CheckCircle2, XCircle, AlertCircle, Gamepad2, ArrowRight
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function MyTeamPage() {
    const [team, setTeam] = useState<any>(null)
    const [invitations, setInvitations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        setLoading(true)
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) setCurrentUserId(user.id)

        const teamData = await getMyTeam()
        setTeam(teamData)

        const inv = await getMyInvitations()
        setInvitations(inv)

        setLoading(false)
    }

    const handleAccept = async (id: string) => {
        setActionLoading(id)
        setError(null)
        const result = await acceptInvitation(id)
        if (result.error) {
            setError(result.error)
        } else {
            setSuccess("Berhasil bergabung dengan tim!")
            setInvitations(prev => prev.filter(i => i.id !== id))
            await loadData()
        }
        setActionLoading(null)
    }

    const handleDecline = async (id: string) => {
        setActionLoading(id)
        await declineInvitation(id)
        setInvitations(prev => prev.filter(i => i.id !== id))
        setActionLoading(null)
    }

    const handleLeave = async () => {
        if (!confirm("Yakin ingin keluar dari tim?")) return
        setActionLoading("leave")
        const result = await leaveTeam()
        if (result.error) {
            setError(result.error)
        } else {
            setTeam(null)
            setSuccess("Berhasil keluar dari tim")
        }
        setActionLoading(null)
    }

    const handleKick = async (memberId: string, memberName: string) => {
        if (!confirm(`Yakin ingin mengeluarkan ${memberName}?`)) return
        setActionLoading(memberId)
        const result = await kickMember(memberId)
        if (result.error) {
            setError(result.error)
        } else {
            setSuccess(`${memberName} berhasil dikeluarkan`)
            await loadData()
        }
        setActionLoading(null)
    }

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
    const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full"
                />
            </div>
        )
    }

    // Belum punya tim
    if (!team) {
        return (
            <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-6">
                {/* No team card */}
                <motion.div
                    variants={item}
                    className="text-center py-16 rounded-2xl"
                    style={{
                        background: "rgba(28,16,42,0.6)",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <div className="w-20 h-20 rounded-2xl bg-violet-500/15 flex items-center justify-center mx-auto mb-6">
                        <Users size={36} className="text-violet-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Belum ada Tim</h2>
                    <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
                        Buat tim baru atau tunggu undangan dari tim lain untuk mulai berkompetisi.
                    </p>
                    <Link href="/home/team/create">
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(147,51,234,0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3 rounded-xl font-bold text-white cursor-pointer"
                            style={{ background: "linear-gradient(135deg, #9333ea, #7c3aed)" }}
                        >
                            Buat Tim Baru
                            <ArrowRight size={16} className="inline ml-2" />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Undangan */}
                {invitations.length > 0 && (
                    <motion.div variants={item}>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <UserPlus size={18} className="text-violet-400" />
                            Undangan Tim Masuk
                        </h3>
                        <div className="space-y-3">
                            {invitations.map((inv: any) => (
                                <div
                                    key={inv.id}
                                    className="rounded-xl p-4 flex items-center justify-between"
                                    style={{
                                        background: "rgba(28,16,42,0.6)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center">
                                            <Gamepad2 size={18} className="text-violet-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold text-sm">{inv.teams?.name}</p>
                                            <p className="text-gray-500 text-xs">Dari {inv.inviter?.username}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleAccept(inv.id)}
                                            disabled={actionLoading === inv.id}
                                            className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/25 transition-colors cursor-pointer disabled:opacity-50"
                                        >
                                            <CheckCircle2 size={14} className="inline mr-1" />
                                            Terima
                                        </button>
                                        <button
                                            onClick={() => handleDecline(inv.id)}
                                            disabled={actionLoading === inv.id}
                                            className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 text-xs font-semibold hover:bg-red-500/25 transition-colors cursor-pointer disabled:opacity-50"
                                        >
                                            <XCircle size={14} className="inline mr-1" />
                                            Tolak
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        )
    }

    const isLeader = team.leader_id === currentUserId

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-6">
            {/* Feedback Messages */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl text-sm"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                    <AlertCircle size={16} className="text-red-400" />
                    <span className="text-red-400">{error}</span>
                </motion.div>
            )}
            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl text-sm"
                    style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}
                >
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span className="text-emerald-400">{success}</span>
                </motion.div>
            )}

            {/* Team Info Card */}
            <motion.div
                variants={item}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(28,16,42,0.85) 100%)",
                    border: "1px solid rgba(139,92,246,0.2)",
                }}
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield size={16} className="text-violet-400" />
                        <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Tim Saya</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-white mb-1">{team.name}</h1>
                    {team.description && (
                        <p className="text-gray-400 text-sm">{team.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-4">
                        <span className="text-xs text-gray-500">
                            {team.team_members?.length || 0} Anggota
                        </span>
                        {isLeader && (
                            <Link href="/home/team/invite" className="text-xs text-violet-400 font-semibold hover:text-violet-300 transition-colors flex items-center gap-1">
                                <UserPlus size={13} />
                                Undang Anggota
                            </Link>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Members List */}
            <motion.div variants={item}>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Users size={18} className="text-violet-400" />
                    Daftar Anggota
                </h3>
                <div className="space-y-2">
                    {team.team_members?.map((member: any) => {
                        const profile = member.profiles
                        const memberIsLeader = member.role === "leader"
                        return (
                            <div
                                key={member.id}
                                className="rounded-xl p-4 flex items-center justify-between"
                                style={{
                                    background: "rgba(28,16,42,0.6)",
                                    border: `1px solid ${memberIsLeader ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.08)"}`,
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white ${memberIsLeader
                                                ? "bg-gradient-to-br from-violet-600 to-violet-800"
                                                : "bg-white/[0.08]"
                                            }`}
                                    >
                                        {profile?.username?.[0]?.toUpperCase() || "?"}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-white font-semibold text-sm">{profile?.username || "Unknown"}</p>
                                            {memberIsLeader && (
                                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-400 bg-amber-400/15">
                                                    <Crown size={10} />
                                                    Leader
                                                </span>
                                            )}
                                        </div>
                                        {profile?.full_name && (
                                            <p className="text-gray-500 text-xs">{profile.full_name}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Kick button (only leader can kick, can't kick themselves) */}
                                {isLeader && !memberIsLeader && (
                                    <button
                                        onClick={() => handleKick(member.id, profile?.username || "member")}
                                        disabled={actionLoading === member.id}
                                        className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors cursor-pointer disabled:opacity-50"
                                    >
                                        <UserMinus size={13} className="inline mr-1" />
                                        Kick
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={item} className="flex gap-3">
                {isLeader && (
                    <Link href="/home/team/invite">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 rounded-xl font-bold text-white text-sm cursor-pointer"
                            style={{ background: "linear-gradient(135deg, #9333ea, #7c3aed)" }}
                        >
                            <UserPlus size={16} className="inline mr-2" />
                            Undang Anggota
                        </motion.button>
                    </Link>
                )}
                {!isLeader && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLeave}
                        disabled={actionLoading === "leave"}
                        className="px-6 py-3 rounded-xl font-bold text-red-400 text-sm cursor-pointer disabled:opacity-50"
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
                    >
                        <LogOut size={16} className="inline mr-2" />
                        Keluar Tim
                    </motion.button>
                )}
            </motion.div>
        </motion.div>
    )
}
