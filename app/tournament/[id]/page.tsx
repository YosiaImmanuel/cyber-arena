"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { getTournamentById } from "@/actions/tournament"
import { getMyTeam } from "@/actions/team"
import { checkRegistration } from "@/actions/tournament"
import {
    Trophy, Calendar, Users, DollarSign, Clock,
    ArrowLeft, Shield, CheckCircle2, XCircle, Info
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

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
        if (!date) return "—"
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric", month: "long", year: "numeric",
        })
    }

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
    const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
            <motion.div
                animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid rgba(99,102,241,0.2)", borderTopColor: "#6366f1" }}
            />
        </div>
    )

    if (!tournament) return (
        <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(79,70,229,0.08)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <Trophy size={20} style={{ color: "rgba(99,102,241,0.4)" }} />
            </div>
            <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: "0.5rem" }}>Turnamen tidak ditemukan</h3>
            <Link href="/tournament" style={{ color: "#818cf8", fontSize: "0.85rem", textDecoration: "none" }}>← Kembali ke daftar</Link>
        </div>
    )

    const slotsLeft = tournament.max_slots - tournament.current_slots
    const isFull = slotsLeft <= 0

    const cardStyle: React.CSSProperties = {
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px", overflow: "hidden",
        position: "relative",
    }

    const accentLine = (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />
    )

    return (
        <motion.div variants={container} initial="hidden" animate="show"
            style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}
        >
            {/* ── Back ── */}
            <motion.div variants={item}>
                <Link href="/tournament" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(180,170,210,0.45)", fontSize: "0.82rem", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#818cf8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(180,170,210,0.45)")}
                >
                    <ArrowLeft size={13} /> Kembali ke daftar turnamen
                </Link>
            </motion.div>

            {/* ── Banner ── */}
            <motion.div variants={item} style={{ borderRadius: "16px", overflow: "hidden", height: "180px", position: "relative" }}>
                {tournament.banner_url ? (
                    <>
                        <img src={tournament.banner_url} alt={tournament.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,3,13,0.92) 0%, rgba(5,3,13,0.2) 100%)" }} />
                    </>
                ) : (
                    <div style={{ width: "100%", height: "100%", background: "rgba(79,70,229,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Trophy size={28} style={{ color: "rgba(99,102,241,0.2)" }} />
                    </div>
                )}

                <div style={{ position: "absolute", bottom: "1rem", left: "1.1rem", right: "1.1rem" }}>
                    <span style={{
                        fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                        padding: "0.2rem 0.6rem", borderRadius: "999px", marginBottom: "0.5rem", display: "inline-block",
                        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
                        color: "rgba(200,210,255,0.75)", border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                        {tournament.game_category}
                    </span>
                    <h1 style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(1.2rem, 3vw, 1.65rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                        {tournament.name}
                    </h1>
                </div>
            </motion.div>

            {/* ── Stats Grid ── */}
            <motion.div variants={item} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem" }}>
                {[
                    { icon: <DollarSign size={14} />, label: "Prize Pool", value: tournament.prize_pool || "TBA" },
                    { icon: <Users size={14} />,      label: "Slot",       value: `${tournament.current_slots}/${tournament.max_slots}` },
                    { icon: <Calendar size={14} />,   label: "Mulai",      value: formatDate(tournament.tournament_start) },
                    { icon: <Clock size={14} />,      label: "Sisa Slot",  value: isFull ? "Penuh" : `${slotsLeft} tersisa` },
                ].map((s, i) => (
                    <div key={i} style={{ ...cardStyle, padding: "0.875rem 1rem" }}>
                        {accentLine}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", color: "#818cf8" }}>
                            {s.icon}
                            <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(180,170,210,0.35)", textTransform: "uppercase" }}>{s.label}</span>
                        </div>
                        <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>{s.value}</p>
                    </div>
                ))}
            </motion.div>

            {/* ── Description ── */}
            {tournament.description && (
                <motion.div variants={item} style={{ ...cardStyle, padding: "1.1rem 1.25rem" }}>
                    {accentLine}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "rgba(79,70,229,0.1)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Info size={12} style={{ color: "#818cf8" }} />
                        </div>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>Deskripsi</span>
                    </div>
                    <p style={{ color: "rgba(180,170,210,0.55)", fontSize: "0.875rem", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                        {tournament.description}
                    </p>
                </motion.div>
            )}

            {/* ── Schedule ── */}
            <motion.div variants={item} style={{ ...cardStyle, padding: "1.1rem 1.25rem" }}>
                {accentLine}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "rgba(79,70,229,0.1)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Calendar size={12} style={{ color: "#818cf8" }} />
                    </div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>Jadwal</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {[
                        { label: "Pendaftaran dibuka",  date: tournament.registration_start },
                        { label: "Pendaftaran ditutup", date: tournament.registration_end },
                        { label: "Turnamen dimulai",    date: tournament.tournament_start },
                        { label: "Turnamen berakhir",   date: tournament.tournament_end },
                    ].map((s, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                            <span style={{ fontSize: "0.82rem", color: "rgba(180,170,210,0.45)" }}>{s.label}</span>
                            <span style={{ fontSize: "0.82rem", color: "#fff", fontWeight: 500 }}>{formatDate(s.date)}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── Organizer ── */}
            <motion.div variants={item} style={{ ...cardStyle, padding: "0.875rem 1.1rem", display: "flex", alignItems: "center", gap: "0.875rem" }}>
                {accentLine}
                <div style={{
                    width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                    boxShadow: "0 4px 12px rgba(99,102,241,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.875rem", fontWeight: 800, color: "#fff",
                }}>
                    {tournament.profiles?.username?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                    <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(180,170,210,0.35)", textTransform: "uppercase", marginBottom: "0.15rem" }}>Organizer</p>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{tournament.profiles?.username || "Unknown"}</p>
                </div>
            </motion.div>

            {/* ── CTA / Status ── */}
            <motion.div variants={item}>
                {registration ? (
                    /* Already registered */
                    <div style={{
                        display: "flex", alignItems: "center", gap: "0.875rem",
                        padding: "1rem 1.25rem", borderRadius: "14px",
                        background: registration.status === "approved" ? "rgba(16,185,129,0.06)"
                            : registration.status === "rejected" ? "rgba(239,68,68,0.06)"
                            : "rgba(99,102,241,0.06)",
                        border: `1px solid ${registration.status === "approved" ? "rgba(52,211,153,0.2)"
                            : registration.status === "rejected" ? "rgba(239,68,68,0.18)"
                            : "rgba(99,102,241,0.2)"}`,
                    }}>
                        {registration.status === "approved"
                            ? <CheckCircle2 size={18} style={{ color: "#34d399", flexShrink: 0 }} />
                            : registration.status === "rejected"
                            ? <XCircle size={18} style={{ color: "#f87171", flexShrink: 0 }} />
                            : <Clock size={18} style={{ color: "#818cf8", flexShrink: 0 }} />
                        }
                        <div>
                            <p style={{
                                fontWeight: 600, fontSize: "0.875rem",
                                color: registration.status === "approved" ? "#34d399"
                                    : registration.status === "rejected" ? "#f87171"
                                    : "#a5b4fc",
                            }}>
                                {registration.status === "approved" ? "Tim kamu sudah terdaftar!"
                                    : registration.status === "rejected" ? "Pendaftaran ditolak"
                                    : "Menunggu persetujuan organizer"}
                            </p>
                            <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.78rem", marginTop: "0.15rem" }}>
                                Tim kamu sudah mendaftar di turnamen ini.
                            </p>
                        </div>
                    </div>
                ) : !team ? (
                    /* No team */
                    <div style={{ ...cardStyle, padding: "1.25rem", textAlign: "center" }}>
                        {accentLine}
                        <p style={{ color: "rgba(180,170,210,0.45)", fontSize: "0.875rem", marginBottom: "1rem" }}>
                            Kamu harus punya tim untuk mendaftar turnamen.
                        </p>
                        <Link href="/team/create" style={{ textDecoration: "none" }}>
                            <motion.span
                                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                                    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                    color: "#fff", fontWeight: 600, fontSize: "0.875rem",
                                    padding: "0.65rem 1.5rem", borderRadius: "999px",
                                    border: "1px solid rgba(99,102,241,0.35)",
                                    boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
                                }}
                            >
                                Buat Tim Dulu
                            </motion.span>
                        </Link>
                    </div>
                ) : !isLeader ? (
                    /* Not leader */
                    <div style={{ ...cardStyle, padding: "1rem 1.25rem" }}>
                        {accentLine}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                            <Shield size={15} style={{ color: "#818cf8", flexShrink: 0 }} />
                            <p style={{ color: "rgba(180,170,210,0.5)", fontSize: "0.875rem" }}>
                                Hanya leader tim yang bisa mendaftarkan tim ke turnamen.
                            </p>
                        </div>
                    </div>
                ) : isFull ? (
                    /* Full */
                    <div style={{ ...cardStyle, padding: "1rem 1.25rem" }}>
                        {accentLine}
                        <p style={{ color: "rgba(180,170,210,0.45)", fontSize: "0.875rem", textAlign: "center" }}>Slot turnamen sudah penuh.</p>
                    </div>
                ) : (
                    /* Register CTA */
                    <Link href={`/tournament/${id}/register`} style={{ textDecoration: "none", display: "block" }}>
                        <motion.div
                            whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(99,102,241,0.35)" }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                color: "#fff", fontWeight: 700, fontSize: "0.975rem",
                                padding: "1rem", borderRadius: "14px",
                                border: "1px solid rgba(99,102,241,0.35)",
                                boxShadow: "0 4px 20px rgba(79,70,229,0.35)", cursor: "pointer",
                            }}
                        >
                            <Trophy size={17} /> Daftar Turnamen
                        </motion.div>
                    </Link>
                )}
            </motion.div>

        </motion.div>
    )
}