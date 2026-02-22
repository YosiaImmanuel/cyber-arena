"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getTournaments } from "@/actions/tournament"
import { Trophy, Calendar, Users, DollarSign, ChevronRight } from "lucide-react"
import Link from "next/link"

const GAME_CATEGORIES = [
    "all",
    "Mobile Legends", "Free Fire", "PUBG Mobile",
    "CODM", "HOK", "CS GO", "Valorant", "DOTA 2", "League of Legends"
]

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

const STATUS_BADGE: Record<string, { label: string; color: string }> = {
    approved:  { label: "Pendaftaran Dibuka", color: "#22c55e" },
    ongoing:   { label: "Sedang Berlangsung", color: "#f59e0b" },
    completed: { label: "Selesai",            color: "#6b7280" },
}

export default function TournamentBrowsePage() {
    const [tournaments, setTournaments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedGame, setSelectedGame] = useState("all")

    useEffect(() => {
        let cancelled = false

        async function load() {
            setLoading(true)
            const data = await getTournaments(selectedGame)
            if (!cancelled) {
                setTournaments(data)
                setLoading(false)
            }
        }

        load()
        return () => { cancelled = true }
    }, [selectedGame])

    const formatDate = (date: string | null) => {
        if (!date) return "-"
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric", month: "short", year: "numeric"
        })
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Trophy size={16} className="text-violet-400" />
                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Tournament</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white">Jelajahi Tournament</h1>
                <p className="text-gray-500 text-sm mt-1">Temukan tournament yang sesuai dan daftarkan tim kamu!</p>
            </div>

            {/* Game Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {GAME_CATEGORIES.map((game) => (
                    <button
                        key={game}
                        onClick={() => setSelectedGame(game)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer
                            ${selectedGame === game
                                ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                                : "bg-white/[0.04] text-gray-500 border border-white/[0.08] hover:bg-white/[0.08] hover:text-gray-300"
                            }`}
                    >
                        {game === "all" ? "Semua Game" : game}
                    </button>
                ))}
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full"
                    />
                </div>
            )}

            {/* Tournament Grid */}
            {!loading && tournaments.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tournaments.map((t: any) => {
                        const gameColor = GAME_COLORS[t.game_category] || "#8b5cf6"
                        const badge = STATUS_BADGE[t.status]

                        return (
                            <Link key={t.id} href={`/home/tournament/${t.id}`}>
                                <motion.div
                                    whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.3)" }}
                                    className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 h-full"
                                    style={{
                                        background: "rgba(28,16,42,0.6)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    {/* Banner */}
                                    <div className="h-36 relative overflow-hidden">
                                        {t.banner_url ? (
                                            <>
                                                <img
                                                    src={t.banner_url}
                                                    alt={t.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const parent = (e.target as HTMLImageElement).parentElement!
                                                        ;(e.target as HTMLImageElement).remove()
                                                        parent.style.background = `linear-gradient(135deg, ${gameColor}33, rgba(28,16,42,0.9))`
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0916] via-transparent to-transparent" />
                                            </>
                                        ) : (
                                            <div
                                                className="w-full h-full"
                                                style={{
                                                    background: `linear-gradient(135deg, ${gameColor}33, rgba(28,16,42,0.9))`,
                                                }}
                                            />
                                        )}

                                        {/* Game badge */}
                                        <div className="absolute bottom-3 left-3">
                                            <span
                                                className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                                                style={{
                                                    background: `${gameColor}20`,
                                                    color: gameColor,
                                                    border: `1px solid ${gameColor}40`,
                                                    backdropFilter: "blur(4px)",
                                                }}
                                            >
                                                {t.game_category}
                                            </span>
                                        </div>

                                        {/* Status badge */}
                                        {badge && (
                                            <div className="absolute top-3 right-3">
                                                <span
                                                    className="px-2 py-1 rounded-md text-[10px] font-bold"
                                                    style={{
                                                        background: `${badge.color}25`,
                                                        color: badge.color,
                                                        border: `1px solid ${badge.color}50`,
                                                        backdropFilter: "blur(4px)",
                                                    }}
                                                >
                                                    {badge.label}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 space-y-3">
                                        <h3 className="text-white font-bold text-sm line-clamp-1">{t.name}</h3>

                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                <DollarSign size={12} className="text-emerald-400" />
                                                <span className="truncate">{t.prize_pool || "TBA"}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                <Users size={12} className="text-violet-400" />
                                                <span>{t.current_slots}/{t.max_slots} Slot</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-500 col-span-2">
                                                <Calendar size={12} className="text-amber-400" />
                                                <span>{formatDate(t.tournament_start)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded bg-white/[0.08] flex items-center justify-center text-[9px] font-bold text-white">
                                                    {t.profiles?.username?.[0]?.toUpperCase() || "?"}
                                                </div>
                                                <span className="text-[11px] text-gray-500">{t.profiles?.username}</span>
                                            </div>
                                            <ChevronRight size={14} className="text-gray-600" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        )
                    })}
                </div>
            )}

            {/* Empty State */}
            {!loading && tournaments.length === 0 && (
                <div className="text-center py-20">
                    <Trophy size={40} className="text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white font-bold mb-2">Tidak ada Tournament</h3>
                    <p className="text-gray-500 text-sm">
                        {selectedGame !== "all"
                            ? `Belum ada tournament ${selectedGame} yang tersedia.`
                            : "Belum ada tournament yang tersedia saat ini."
                        }
                    </p>
                </div>
            )}
        </div>
    )
}