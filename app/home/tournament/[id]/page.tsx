"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { getTournamentById } from "@/actions/tournament"
import { getMyTeam } from "@/actions/team"
import { checkRegistration } from "@/actions/tournament"
import {
    Trophy, Calendar, Users, DollarSign, User, Clock,
    ExternalLink, ArrowLeft, Shield, CheckCircle2, XCircle,
    Gamepad2, MapPin, Info
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const GAME_COLORS: Record<string, string> = {
    "Mobile Legends": "#0080ff",
    "Free Fire": "#ff6b00",
    "PUBG Mobile": "#f5c518",
    "CODM": "#00c853",
    "HOK": "#ff1744",
    "CS GO": "#ff9800",
    "Valorant": "#ff4655",
    "DOTA 2": "#c23616",
    "League of Legends": "#c89b3c",
}

export default function TournamentDetailPage() {
    const params = useParams()
    const id = params.id as string

    const [tournament, setTournament] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [team, setTeam] = useState<any>(null)
    const [isLeader, setIsLeader] = useState(false)
    const [registration, setRegistration] = useState<any>(null)

    useEffect(() => {
        async function load() {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            const t = await getTournamentById(id)
            setTournament(t)

            const myTeam = await getMyTeam()
            setTeam(myTeam)

            if (myTeam && user) {
                setIsLeader(myTeam.leader_id === user.id)
                const reg = await checkRegistration(id, myTeam.id)
                setRegistration(reg)
            }

            setLoading(false)
        }
        load()
    }, [id])

    const formatDate = (date: string | null) => {
        if (!date) return "-"
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric", month: "long", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        })
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

    if (!tournament) {
        return (
            <div className="text-center py-20">
                <Trophy size={40} className="text-gray-600 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">Tournament tidak ditemukan</h3>
                <Link href="/home/tournament" className="text-violet-400 text-sm hover:underline">
                    ← Kembali ke daftar tournament
                </Link>
            </div>
        )
    }

    const gameColor = GAME_COLORS[tournament.game_category] || "#8b5cf6"
    const slotsLeft = tournament.max_slots - tournament.current_slots
    const isFull = slotsLeft <= 0

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-6">
            {/* Back */}
            <motion.div variants={item}>
                <Link
                    href="/home/tournament"
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-violet-400 transition-colors"
                >
                    <ArrowLeft size={14} />
                    Kembali ke daftar tournament
                </Link>
            </motion.div>

            {/* Banner */}
            <motion.div
                variants={item}
                className="rounded-2xl overflow-hidden relative h-48 md:h-56"
                style={{
                    background: tournament.banner_url
                        ? `url(${tournament.banner_url}) center/cover`
                        : `linear-gradient(135deg, ${gameColor}33, rgba(28,16,42,0.9))`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0916] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                        <span
                            className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-2 inline-block"
                            style={{
                                background: `${gameColor}20`,
                                color: gameColor,
                                border: `1px solid ${gameColor}40`,
                            }}
                        >
                            {tournament.game_category}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-white">{tournament.name}</h1>
                    </div>
                </div>
            </motion.div>

            {/* Info Grid */}
            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    {
                        icon: <DollarSign size={18} className="text-emerald-400" />,
                        label: "Prize Pool",
                        value: tournament.prize_pool || "TBA",
                        bg: "emerald"
                    },
                    {
                        icon: <Users size={18} className="text-violet-400" />,
                        label: "Slot",
                        value: `${tournament.current_slots}/${tournament.max_slots}`,
                        bg: "violet"
                    },
                    {
                        icon: <Calendar size={18} className="text-amber-400" />,
                        label: "Mulai",
                        value: formatDate(tournament.tournament_start).split(",")[0] || "-",
                        bg: "amber"
                    },
                    {
                        icon: <Clock size={18} className="text-blue-400" />,
                        label: "Status",
                        value: isFull ? "Penuh" : `${slotsLeft} slot tersisa`,
                        bg: "blue"
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="rounded-xl p-4"
                        style={{
                            background: "rgba(28,16,42,0.6)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <div className={`w-9 h-9 rounded-lg bg-${stat.bg}-500/15 flex items-center justify-center mb-2`}>
                            {stat.icon}
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                        <p className="text-white font-bold text-sm mt-0.5">{stat.value}</p>
                    </div>
                ))}
            </motion.div>

            {/* Description */}
            {tournament.description && (
                <motion.div
                    variants={item}
                    className="rounded-xl p-5"
                    style={{
                        background: "rgba(28,16,42,0.6)",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <Info size={14} className="text-violet-400" />
                        Deskripsi
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                        {tournament.description}
                    </p>
                </motion.div>
            )}

            {/* Timeline */}
            <motion.div
                variants={item}
                className="rounded-xl p-5"
                style={{
                    background: "rgba(28,16,42,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar size={14} className="text-violet-400" />
                    Jadwal
                </h3>
                <div className="space-y-3">
                    {[
                        { label: "Pendaftaran Dibuka", date: tournament.registration_start },
                        { label: "Pendaftaran Ditutup", date: tournament.registration_end },
                        { label: "Tournament Dimulai", date: tournament.tournament_start },
                        { label: "Tournament Berakhir", date: tournament.tournament_end },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">{item.label}</span>
                            <span className="text-white text-xs font-medium">{formatDate(item.date)}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Organizer */}
            <motion.div
                variants={item}
                className="rounded-xl p-4 flex items-center gap-3"
                style={{
                    background: "rgba(28,16,42,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center text-sm font-bold text-white">
                    {tournament.profiles?.username?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Organizer</p>
                    <p className="text-white font-semibold text-sm">{tournament.profiles?.username || "Unknown"}</p>
                </div>
            </motion.div>

            {/* CTA / Registration Status */}
            <motion.div variants={item} className="space-y-3">
                {registration ? (
                    <div
                        className="rounded-xl p-4 flex items-center gap-3"
                        style={{
                            background: registration.status === "approved"
                                ? "rgba(34,197,94,0.1)"
                                : registration.status === "rejected"
                                    ? "rgba(239,68,68,0.1)"
                                    : "rgba(251,191,36,0.1)",
                            border: `1px solid ${registration.status === "approved"
                                    ? "rgba(34,197,94,0.3)"
                                    : registration.status === "rejected"
                                        ? "rgba(239,68,68,0.3)"
                                        : "rgba(251,191,36,0.3)"
                                }`,
                        }}
                    >
                        {registration.status === "approved" ? (
                            <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                        ) : registration.status === "rejected" ? (
                            <XCircle size={20} className="text-red-400 shrink-0" />
                        ) : (
                            <Clock size={20} className="text-amber-400 shrink-0" />
                        )}
                        <div>
                            <p className={`font-semibold text-sm ${registration.status === "approved" ? "text-emerald-400"
                                    : registration.status === "rejected" ? "text-red-400"
                                        : "text-amber-400"
                                }`}>
                                {registration.status === "approved"
                                    ? "Tim kamu sudah terdaftar!"
                                    : registration.status === "rejected"
                                        ? "Pendaftaran ditolak"
                                        : "Menunggu persetujuan organizer"
                                }
                            </p>
                            <p className="text-gray-500 text-xs mt-0.5">
                                Tim kamu sudah mendaftar di tournament ini.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {!team ? (
                            <div
                                className="rounded-xl p-4 text-center"
                                style={{
                                    background: "rgba(28,16,42,0.6)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                <p className="text-gray-400 text-sm mb-3">Kamu harus punya tim untuk mendaftar tournament.</p>
                                <Link href="/home/team/create">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-2.5 rounded-xl font-bold text-white text-sm cursor-pointer"
                                        style={{ background: "linear-gradient(135deg, #9333ea, #7c3aed)" }}
                                    >
                                        Buat Tim Dulu
                                    </motion.button>
                                </Link>
                            </div>
                        ) : !isLeader ? (
                            <div
                                className="rounded-xl p-4 text-center"
                                style={{
                                    background: "rgba(28,16,42,0.6)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                <p className="text-gray-400 text-sm">Hanya leader tim yang bisa mendaftarkan tim ke tournament.</p>
                            </div>
                        ) : isFull ? (
                            <div
                                className="rounded-xl p-4 text-center"
                                style={{
                                    background: "rgba(28,16,42,0.6)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                <p className="text-gray-400 text-sm">Slot tournament sudah penuh.</p>
                            </div>
                        ) : (
                            <Link href={`/home/tournament/${id}/register`}>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(147,51,234,0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 cursor-pointer"
                                    style={{ background: "linear-gradient(135deg, #9333ea, #7c3aed)" }}
                                >
                                    <Trophy size={18} />
                                    Daftar Tournament
                                </motion.button>
                            </Link>
                        )}
                    </>
                )}
            </motion.div>
        </motion.div>
    )
}
