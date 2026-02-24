"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getMyTournaments } from "@/actions/tournament"
import {
    Trophy, Calendar, Users,
    DollarSign, ChevronRight, Plus
} from "lucide-react"
import Link from "next/link"

const STATUS_CONFIG: Record<string, { label: string; dot: string }> = {
    pending:   { label: "Menunggu persetujuan", dot: "rgba(252,211,77,0.8)" },
    approved:  { label: "Pendaftaran dibuka",   dot: "rgba(134,239,172,0.8)" },
    rejected:  { label: "Ditolak",              dot: "rgba(248,113,113,0.8)" },
    ongoing:   { label: "Sedang berlangsung",   dot: "rgba(129,140,248,0.8)" },
    completed: { label: "Selesai",              dot: "rgba(180,170,210,0.35)" },
}

export default function MyTournamentsPage() {
    const [tournaments, setTournaments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const data = await getMyTournaments()
            setTournaments(data || [])
            setLoading(false)
        }
        load()
    }, [])

    const formatDate = (date: string | null) => {
        if (!date) return "—"
        return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    }

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
    const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
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
        )
    }

    if (tournaments.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
                <div style={{
                    width: "48px", height: "48px", borderRadius: "14px",
                    background: "rgba(79,70,229,0.08)", border: "1px solid rgba(99,102,241,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1rem",
                }}>
                    <Trophy size={20} style={{ color: "rgba(99,102,241,0.4)" }} />
                </div>
                <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "0.975rem", marginBottom: "0.5rem" }}>
                    Belum ada turnamen
                </h3>
                <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
                    Kamu belum membuat turnamen apapun.
                </p>
                <Link href="/tournament/create" style={{ textDecoration: "none" }}>
                    <motion.span
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "0.4rem",
                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                            color: "#fff", fontWeight: 600, fontSize: "0.85rem",
                            padding: "0.6rem 1.4rem", borderRadius: "999px",
                            border: "1px solid rgba(99,102,241,0.35)",
                            boxShadow: "0 4px 16px rgba(79,70,229,0.3)",
                        }}
                    >
                        <Plus size={13} />
                        Buat Turnamen
                    </motion.span>
                </Link>
            </div>
        )
    }

    return (
        <motion.div
            variants={container} initial="hidden" animate="show"
            style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.75rem" }}
        >
            {/* ── Header ── */}
            <motion.div variants={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                        <div style={{
                            width: "28px", height: "28px",
                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                            borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                        }}>
                            <Trophy size={13} color="#fff" strokeWidth={2.2} />
                        </div>
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: "#818cf8", textTransform: "uppercase" }}>
                            Turnamen Saya
                        </span>
                    </div>
                    <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                        {tournaments.length} Turnamen
                    </h1>
                </div>

                <Link href="/tournament/create" style={{ textDecoration: "none" }}>
                    <motion.span
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "0.4rem",
                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                            color: "#fff", fontWeight: 600, fontSize: "0.8rem",
                            padding: "0.5rem 1.1rem", borderRadius: "999px",
                            border: "1px solid rgba(99,102,241,0.35)",
                            boxShadow: "0 4px 12px rgba(79,70,229,0.25)",
                        }}
                    >
                        <Plus size={13} />
                        Buat Baru
                    </motion.span>
                </Link>
            </motion.div>

            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

            {/* ── List ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {tournaments.map((t, i) => {
                    const status = STATUS_CONFIG[t.status] || STATUS_CONFIG["pending"]

                    return (
                        <motion.div key={t.id} variants={item}>
                            <Link href={`/tournament/${t.id}`} style={{ textDecoration: "none", display: "block" }}>
                                <motion.div
                                    whileHover={{ borderColor: "rgba(99,102,241,0.3)", y: -2 }}
                                    whileTap={{ scale: 0.99 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: "16px", overflow: "hidden",
                                        cursor: "pointer",
                                    }}
                                >
                                    {/* Banner / top section */}
                                    <div style={{ position: "relative", height: "100px", overflow: "hidden" }}>
                                        {t.banner_url ? (
                                            <>
                                                <img
                                                    src={t.banner_url} alt={t.name}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
                                                />
                                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,3,13,0.9) 0%, rgba(5,3,13,0.2) 100%)" }} />
                                            </>
                                        ) : (
                                            <div style={{
                                                width: "100%", height: "100%",
                                                background: "rgba(79,70,229,0.05)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}>
                                                <Trophy size={20} style={{ color: "rgba(99,102,241,0.2)" }} />
                                            </div>
                                        )}

                                        {/* Game tag */}
                                        <div style={{ position: "absolute", bottom: "8px", left: "12px" }}>
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
                                    </div>

                                    {/* Content */}
                                    <div style={{ padding: "0.9rem 1.1rem" }}>
                                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.75rem" }}>
                                            <h2 style={{
                                                color: "#fff", fontWeight: 600, fontSize: "0.925rem",
                                                lineHeight: 1.35, flex: 1,
                                                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                            }}>
                                                {t.name}
                                            </h2>
                                            <ChevronRight size={14} style={{ color: "rgba(255,255,255,0.18)", flexShrink: 0, marginTop: "2px" }} />
                                        </div>

                                        {/* Stats row */}
                                        <div style={{ display: "flex", gap: "1.25rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
                                            {[
                                                { icon: <DollarSign size={11} />, value: t.prize_pool || "TBA" },
                                                { icon: <Users size={11} />, value: `${t.current_slots}/${t.max_slots} slot` },
                                                { icon: <Calendar size={11} />, value: formatDate(t.tournament_start) },
                                            ].map((s, idx) => (
                                                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                                    <span style={{ color: "#818cf8", display: "flex" }}>{s.icon}</span>
                                                    <span style={{ fontSize: "0.75rem", color: "rgba(180,170,210,0.45)" }}>{s.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Status */}
                                        <div style={{
                                            display: "flex", alignItems: "center", gap: "0.5rem",
                                            paddingTop: "0.7rem", borderTop: "1px solid rgba(255,255,255,0.05)",
                                        }}>
                                            <span style={{
                                                width: 6, height: 6, borderRadius: "50%",
                                                background: status.dot, display: "inline-block", flexShrink: 0,
                                            }} />
                                            <span style={{ fontSize: "0.78rem", color: "rgba(180,170,210,0.55)", fontWeight: 500 }}>
                                                {status.label}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}