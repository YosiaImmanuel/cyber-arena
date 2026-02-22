"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { getMyTeam, getMyInvitations, acceptInvitation, declineInvitation } from "@/actions/team"
import {
    Trophy, Users, Gamepad2, ArrowRight, UserPlus,
    CheckCircle2, XCircle, Zap, Shield, Swords
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
    const [username, setUsername] = useState("")
    const [teamName, setTeamName] = useState<string | null>(null)
    const [memberCount, setMemberCount] = useState(0)
    const [invitations, setInvitations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("username")
                    .eq("id", user.id)
                    .single()

                setUsername(
                    profile?.username ||
                    user.email?.split("@")[0] ||
                    "Player"
                )
            }

            const team = await getMyTeam()
            if (team) {
                setTeamName(team.name)
                setMemberCount(team.team_members?.length || 0)
            }

            const inv = await getMyInvitations()
            setInvitations(inv)
            setLoading(false)
        }

        load()

        const supabase = createClient()
        const channel = supabase
            .channel("homepage-profile-watch")
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "profiles" },
                (payload) => {
                    if (payload.new?.username) {
                        setUsername(payload.new.username)
                    }
                }
            )
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [])

    const handleAccept = async (id: string) => {
        setActionLoading(id)
        const result = await acceptInvitation(id)
        if (!result.error) {
            setInvitations(prev => prev.filter(i => i.id !== id))
            const team = await getMyTeam()
            if (team) {
                setTeamName(team.name)
                setMemberCount(team.team_members?.length || 0)
            }
        }
        setActionLoading(null)
    }

    const handleDecline = async (id: string) => {
        setActionLoading(id)
        await declineInvitation(id)
        setInvitations(prev => prev.filter(i => i.id !== id))
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

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-6">
            {/* Welcome Banner */}
            <motion.div
                variants={item}
                className="relative overflow-hidden rounded-2xl p-8"
                style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(109,40,217,0.15) 50%, rgba(28,16,42,0.9) 100%)",
                    border: "1px solid rgba(139,92,246,0.2)",
                }}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap size={16} className="text-violet-400" />
                        <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Dashboard</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">
                        Selamat datang, <span className="text-violet-400">{username}</span>! 👋
                    </h1>
                    <p className="text-gray-400 text-sm max-w-lg">
                        Siap untuk kompetisi berikutnya? Kelola tim kamu, jelajahi tournament, dan raih kemenangan!
                    </p>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tim Status */}
                <div
                    className="rounded-xl p-5 transition-all duration-200 hover:border-violet-500/30"
                    style={{
                        background: "rgba(28,16,42,0.6)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center">
                            <Shield size={20} className="text-violet-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Tim Kamu</p>
                            <p className="text-sm font-bold text-white">{teamName || "Belum ada tim"}</p>
                        </div>
                    </div>
                    {teamName && (
                        <p className="text-xs text-gray-500">{memberCount} anggota</p>
                    )}
                </div>

                {/* Undangan */}
                <div
                    className="rounded-xl p-5 transition-all duration-200 hover:border-violet-500/30"
                    style={{
                        background: "rgba(28,16,42,0.6)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
                            <UserPlus size={20} className="text-amber-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Undangan Masuk</p>
                            <p className="text-sm font-bold text-white">{invitations.length} undangan</p>
                        </div>
                    </div>
                </div>

                {/* Tournament */}
                <div
                    className="rounded-xl p-5 transition-all duration-200 hover:border-violet-500/30"
                    style={{
                        background: "rgba(28,16,42,0.6)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                            <Swords size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Tournament</p>
                            <p className="text-sm font-bold text-white">Jelajahi Sekarang</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!teamName ? (
                    <Link href="/home/team/create">
                        <div
                            className="rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10"
                            style={{
                                background: "rgba(28,16,42,0.6)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center shadow-lg shadow-violet-900/50">
                                        <Users size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base">Buat Tim</h3>
                                        <p className="text-gray-500 text-xs mt-0.5">Bentuk tim dan mulai berkompetisi</p>
                                    </div>
                                </div>
                                <ArrowRight size={18} className="text-gray-600 group-hover:text-violet-400 transition-colors" />
                            </div>
                        </div>
                    </Link>
                ) : (
                    <Link href="/home/team">
                        <div
                            className="rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10"
                            style={{
                                background: "rgba(28,16,42,0.6)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center shadow-lg shadow-violet-900/50">
                                        <Users size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base">Tim Saya</h3>
                                        <p className="text-gray-500 text-xs mt-0.5">Kelola tim dan anggota</p>
                                    </div>
                                </div>
                                <ArrowRight size={18} className="text-gray-600 group-hover:text-violet-400 transition-colors" />
                            </div>
                        </div>
                    </Link>
                )}

                <Link href="/home/tournament">
                    <div
                        className="rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10"
                        style={{
                            background: "rgba(28,16,42,0.6)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-900/50">
                                    <Trophy size={22} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-base">Browse Tournament</h3>
                                    <p className="text-gray-500 text-xs mt-0.5">Temukan dan ikuti tournament terbaik</p>
                                </div>
                            </div>
                            <ArrowRight size={18} className="text-gray-600 group-hover:text-emerald-400 transition-colors" />
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Undangan Masuk */}
            {invitations.length > 0 && (
                <motion.div variants={item}>
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <UserPlus size={18} className="text-violet-400" />
                        Undangan Tim Masuk
                    </h2>
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
                                        <p className="text-white font-semibold text-sm">
                                            {inv.teams?.name || "Unknown Team"}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            Diundang oleh {inv.inviter?.username || "unknown"}
                                        </p>
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