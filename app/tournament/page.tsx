"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getTournaments } from "@/actions/tournament"
import { Trophy, Calendar, Users, ChevronRight, DollarSign } from "lucide-react"
import Link from "next/link"

const GAME_CATEGORIES = [
    "all",
    "Mobile Legends", "Free Fire", "PUBG Mobile",
    "CODM", "HOK", "CS GO", "Valorant", "DOTA 2", "League of Legends"
]

const STATUS_CONFIG: Record<string, { label: string }> = {
    approved:  { label: "Pendaftaran Dibuka" },
    ongoing:   { label: "Sedang Berlangsung" },
    completed: { label: "Selesai" },
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
            if (!cancelled) { setTournaments(data); setLoading(false) }
        }
        load()
        return () => { cancelled = true }
    }, [selectedGame])

    const formatDate = (date: string | null) => {
        if (!date) return "—"
        return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    }

    return (
        <>
            <style>{`
                .filter-scroll::-webkit-scrollbar { display: none; }
                .filter-scroll { -ms-overflow-style: none; scrollbar-width: none; }

                .filter-chip {
                    padding: 0.4rem 0.9rem;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    white-space: nowrap;
                    cursor: pointer;
                    border: 1px solid rgba(255,255,255,0.08);
                    color: rgba(180,170,210,0.5);
                    background: transparent;
                    transition: all 0.15s;
                    font-family: inherit;
                }
                .filter-chip:hover {
                    border-color: rgba(99,102,241,0.25);
                    color: rgba(180,170,210,0.85);
                }
                .filter-chip.active {
                    border-color: rgba(99,102,241,0.4);
                    color: #a5b4fc;
                    background: rgba(79,70,229,0.1);
                }

                .tour-card {
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: border-color 0.2s, transform 0.2s;
                    text-decoration: none;
                    display: block;
                }
                .tour-card:hover {
                    border-color: rgba(99,102,241,0.28);
                    transform: translateY(-3px);
                }

                @media (max-width: 640px) {
                    .tour-grid { grid-template-columns: 1fr !important; }
                }
                @media (min-width: 641px) and (max-width: 1024px) {
                    .tour-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
            `}</style>

            <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.75rem" }}>

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <div style={{
                            width: "28px", height: "28px",
                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                            borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                        }}>
                            <Trophy size={13} color="#fff" strokeWidth={2.2} />
                        </div>
                        <span style={{
                            fontSize: "0.72rem", fontWeight: 700,
                            letterSpacing: "0.1em", color: "#818cf8",
                            textTransform: "uppercase",
                        }}>Turnamen</span>
                    </div>
                    <h1 style={{
                        fontSize: "clamp(1.4rem, 3vw, 1.85rem)",
                        fontWeight: 700, color: "#fff",
                        letterSpacing: "-0.02em", marginBottom: "0.3rem",
                    }}>
                        Jelajahi Turnamen
                    </h1>
                    <p style={{ color: "rgba(180,170,210,0.45)", fontSize: "0.875rem" }}>
                        Temukan turnamen yang sesuai dan daftarkan tim kamu.
                    </p>
                </motion.div>

                {/* ── Filter Chips ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="filter-scroll"
                    style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "2px" }}
                >
                    {GAME_CATEGORIES.map(game => (
                        <button
                            key={game}
                            className={`filter-chip${selectedGame === game ? " active" : ""}`}
                            onClick={() => setSelectedGame(game)}
                        >
                            {game === "all" ? "Semua" : game}
                        </button>
                    ))}
                </motion.div>

                {/* ── Loading ── */}
                {loading && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            style={{
                                width: 24, height: 24, borderRadius: "50%",
                                border: "2px solid rgba(99,102,241,0.2)",
                                borderTopColor: "#6366f1",
                            }}
                        />
                    </div>
                )}

                {/* ── Grid ── */}
                {!loading && tournaments.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="tour-grid"
                        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem" }}
                    >
                        {tournaments.map((t: any, i: number) => {
                            const status = STATUS_CONFIG[t.status]
                            const isOpen = t.status === "approved"
                            const isOngoing = t.status === "ongoing"

                            return (
                                <motion.div
                                    key={t.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04, duration: 0.35 }}
                                >
                                    <Link href={`/tournament/${t.id}`} className="tour-card">

                                        {/* Banner */}
                                        <div style={{ height: "120px", position: "relative", overflow: "hidden" }}>
                                            {t.banner_url ? (
                                                <>
                                                    <img
                                                        src={t.banner_url}
                                                        alt={t.name}
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                        onError={(e) => {
                                                            const el = e.target as HTMLImageElement
                                                            el.style.display = "none"
                                                            el.parentElement!.style.background = "rgba(79,70,229,0.06)"
                                                        }}
                                                    />
                                                    <div style={{
                                                        position: "absolute", inset: 0,
                                                        background: "linear-gradient(to top, rgba(5,3,13,0.85) 0%, transparent 60%)",
                                                    }} />
                                                </>
                                            ) : (
                                                <div style={{
                                                    width: "100%", height: "100%",
                                                    background: "rgba(79,70,229,0.06)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                }}>
                                                    <Trophy size={24} style={{ color: "rgba(99,102,241,0.25)" }} />
                                                </div>
                                            )}

                                            {/* Game badge */}
                                            <div style={{ position: "absolute", bottom: "8px", left: "10px" }}>
                                                <span style={{
                                                    fontSize: "0.65rem", fontWeight: 700,
                                                    letterSpacing: "0.06em", textTransform: "uppercase",
                                                    padding: "0.2rem 0.6rem", borderRadius: "999px",
                                                    background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
                                                    color: "rgba(200,210,255,0.75)",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                }}>
                                                    {t.game_category}
                                                </span>
                                            </div>

                                            {/* Status dot */}
                                            {status && (
                                                <div style={{ position: "absolute", top: "8px", right: "10px" }}>
                                                    <span style={{
                                                        fontSize: "0.65rem", fontWeight: 600,
                                                        padding: "0.2rem 0.6rem", borderRadius: "999px",
                                                        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
                                                        color: isOpen ? "#86efac" : isOngoing ? "#fcd34d" : "rgba(180,170,210,0.5)",
                                                        border: `1px solid ${isOpen ? "rgba(134,239,172,0.2)" : isOngoing ? "rgba(252,211,77,0.2)" : "rgba(255,255,255,0.08)"}`,
                                                        display: "flex", alignItems: "center", gap: "0.3rem",
                                                    }}>
                                                        <span style={{
                                                            width: 5, height: 5, borderRadius: "50%",
                                                            background: isOpen ? "#4ade80" : isOngoing ? "#fbbf24" : "rgba(180,170,210,0.4)",
                                                            display: "inline-block",
                                                        }} />
                                                        {status.label}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div style={{ padding: "0.9rem 1rem" }}>
                                            <h3 style={{
                                                color: "#fff", fontWeight: 600, fontSize: "0.875rem",
                                                marginBottom: "0.65rem", lineHeight: 1.35,
                                                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                            }}>
                                                {t.name}
                                            </h3>

                                            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "0.75rem" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <DollarSign size={11} style={{ color: "#818cf8", flexShrink: 0 }} />
                                                    <span style={{ fontSize: "0.75rem", color: "rgba(180,170,210,0.5)" }}>
                                                        {t.prize_pool || "TBA"}
                                                    </span>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <Users size={11} style={{ color: "#818cf8", flexShrink: 0 }} />
                                                    <span style={{ fontSize: "0.75rem", color: "rgba(180,170,210,0.5)" }}>
                                                        {t.current_slots}/{t.max_slots} slot
                                                    </span>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <Calendar size={11} style={{ color: "#818cf8", flexShrink: 0 }} />
                                                    <span style={{ fontSize: "0.75rem", color: "rgba(180,170,210,0.5)" }}>
                                                        {formatDate(t.tournament_start)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div style={{
                                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                                paddingTop: "0.65rem", borderTop: "1px solid rgba(255,255,255,0.06)",
                                            }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <div style={{
                                                        width: "20px", height: "20px", borderRadius: "6px",
                                                        background: "rgba(79,70,229,0.15)", border: "1px solid rgba(99,102,241,0.2)",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        fontSize: "0.6rem", fontWeight: 700, color: "#818cf8",
                                                    }}>
                                                        {t.profiles?.username?.[0]?.toUpperCase() || "?"}
                                                    </div>
                                                    <span style={{ fontSize: "0.72rem", color: "rgba(180,170,210,0.4)" }}>
                                                        {t.profiles?.username}
                                                    </span>
                                                </div>
                                                <ChevronRight size={13} style={{ color: "rgba(255,255,255,0.18)" }} />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                )}

                {/* ── Empty State ── */}
                {!loading && tournaments.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textAlign: "center", padding: "5rem 0" }}
                    >
                        <div style={{
                            width: "48px", height: "48px", borderRadius: "14px",
                            background: "rgba(79,70,229,0.08)", border: "1px solid rgba(99,102,241,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 1rem",
                        }}>
                            <Trophy size={20} style={{ color: "rgba(99,102,241,0.4)" }} />
                        </div>
                        <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "0.975rem", marginBottom: "0.4rem" }}>
                            Tidak ada turnamen
                        </h3>
                        <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.85rem" }}>
                            {selectedGame !== "all"
                                ? `Belum ada turnamen ${selectedGame} yang tersedia.`
                                : "Belum ada turnamen yang tersedia saat ini."
                            }
                        </p>
                    </motion.div>
                )}

            </div>
        </>
    )
}