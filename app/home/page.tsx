"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { getMyTeam, getMyInvitations, acceptInvitation, declineInvitation } from "@/actions/team"
import {
    Trophy, Users, UserPlus, CheckCircle2, XCircle,
    Shield, Swords, ChevronRight, Sword
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
                    .from("profiles").select("username").eq("id", user.id).single()
                setUsername(profile?.username || user.email?.split("@")[0] || "Player")
            }
            const team = await getMyTeam()
            if (team) { setTeamName(team.name); setMemberCount(team.team_members?.length || 0) }
            const inv = await getMyInvitations()
            setInvitations(inv)
            setLoading(false)
        }
        load()

        const supabase = createClient()
        const channel = supabase
            .channel("homepage-profile-watch")
            .on("postgres_changes",
                { event: "UPDATE", schema: "public", table: "profiles" },
                (payload) => { if (payload.new?.username) setUsername(payload.new.username) }
            ).subscribe()
        return () => { supabase.removeChannel(channel) }
    }, [])

    const handleAccept = async (id: string) => {
        setActionLoading(id)
        const result = await acceptInvitation(id)
        if (!result.error) {
            setInvitations(prev => prev.filter(i => i.id !== id))
            const team = await getMyTeam()
            if (team) { setTeamName(team.name); setMemberCount(team.team_members?.length || 0) }
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
    const item = {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
    }

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                        width: 24, height: 24, borderRadius: "50%",
                        border: "2px solid rgba(99,102,241,0.25)",
                        borderTopColor: "#6366f1",
                    }}
                />
            </div>
        )
    }

    return (
        <motion.div
            variants={container} initial="hidden" animate="show"
            style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.75rem" }}
        >
            {/* ── Welcome ── */}
            <motion.div variants={item}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                    <div style={{
                        width: "28px", height: "28px",
                        background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                        borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                        flexShrink: 0,
                    }}>
                        <Sword size={13} color="#fff" strokeWidth={2.2} />
                    </div>
                    <span style={{
                        fontSize: "0.72rem", fontWeight: 700,
                        letterSpacing: "0.1em", color: "#818cf8",
                        textTransform: "uppercase",
                    }}>Dashboard</span>
                </div>

                <h1 style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700, color: "#fff",
                    letterSpacing: "-0.02em", lineHeight: 1.2,
                    marginBottom: "0.35rem",
                }}>
                    Selamat datang,{" "}
                    <span style={{
                        background: "linear-gradient(135deg, #c4b5fd, #818cf8)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>
                        {username}
                    </span>
                </h1>
                <p style={{ color: "rgba(180,170,210,0.5)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    Kelola tim, jelajahi turnamen, dan pantau perkembangan kamu.
                </p>
            </motion.div>

            {/* ── Divider ── */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

            {/* ── Stats Row ── */}
            <motion.div variants={item}>
                <p style={{
                    fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "1rem",
                }}>Ringkasan</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
                    {[
                        {
                            icon: <Shield size={15} style={{ color: "#818cf8" }} />,
                            label: "Tim Kamu",
                            value: teamName || "—",
                            sub: teamName ? `${memberCount} anggota` : "Belum ada tim",
                        },
                        {
                            icon: <UserPlus size={15} style={{ color: "#818cf8" }} />,
                            label: "Undangan",
                            value: invitations.length > 0 ? `${invitations.length}` : "—",
                            sub: invitations.length > 0 ? "Undangan masuk" : "Tidak ada",
                        },
                        {
                            icon: <Swords size={15} style={{ color: "#818cf8" }} />,
                            label: "Turnamen",
                            value: "Tersedia",
                            sub: "Lihat semua event",
                        },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            style={{
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: "14px", padding: "1.1rem 1.25rem",
                                position: "relative", overflow: "hidden",
                            }}
                        >
                            {/* Top accent */}
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                                background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)",
                            }} />
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                                <div style={{
                                    width: "28px", height: "28px", borderRadius: "8px",
                                    background: "rgba(79,70,229,0.1)", border: "1px solid rgba(99,102,241,0.15)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    {stat.icon}
                                </div>
                                <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
                                    {stat.label}
                                </span>
                            </div>
                            <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.01em" }}>{stat.value}</p>
                            <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.78rem", marginTop: "0.2rem" }}>{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── Quick Actions ── */}
            <motion.div variants={item}>
                <p style={{
                    fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "1rem",
                }}>Aksi Cepat</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>

                    <Link href={teamName ? "/team" : "/team/create"} style={{ textDecoration: "none" }}>
                        <motion.div
                            whileHover={{ borderColor: "rgba(99,102,241,0.3)", y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{
                                border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px",
                                padding: "1.1rem 1.25rem", cursor: "pointer",
                                display: "flex", alignItems: "center", gap: "1rem",
                            }}
                        >
                            <div style={{
                                width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
                                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Users size={17} color="#fff" />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>
                                    {teamName ? "Tim Saya" : "Buat Tim"}
                                </p>
                                <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.78rem", marginTop: "0.15rem" }}>
                                    {teamName ? "Kelola tim kamu" : "Buat dan undang anggota"}
                                </p>
                            </div>
                            <ChevronRight size={15} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                        </motion.div>
                    </Link>

                    <Link href="/tournament" style={{ textDecoration: "none" }}>
                        <motion.div
                            whileHover={{ borderColor: "rgba(99,102,241,0.3)", y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{
                                border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px",
                                padding: "1.1rem 1.25rem", cursor: "pointer",
                                display: "flex", alignItems: "center", gap: "1rem",
                            }}
                        >
                            <div style={{
                                width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
                                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Trophy size={17} color="#fff" />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Browse Turnamen</p>
                                <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.78rem", marginTop: "0.15rem" }}>
                                    Temukan dan daftar event
                                </p>
                            </div>
                            <ChevronRight size={15} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                        </motion.div>
                    </Link>

                </div>
            </motion.div>

            {/* ── Undangan ── */}
            {invitations.length > 0 && (
                <motion.div variants={item}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                        <p style={{
                            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                            color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
                        }}>Undangan Tim</p>
                        <span style={{
                            fontSize: "0.68rem", fontWeight: 700,
                            padding: "0.15rem 0.55rem", borderRadius: "999px",
                            background: "rgba(99,102,241,0.12)", color: "#818cf8",
                            border: "1px solid rgba(99,102,241,0.2)",
                            letterSpacing: "0.05em",
                        }}>
                            {invitations.length} BARU
                        </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {invitations.map((inv: any, idx: number) => (
                            <motion.div
                                key={inv.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.06 }}
                                style={{
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: "14px", padding: "1rem 1.25rem",
                                    display: "flex", alignItems: "center",
                                    justifyContent: "space-between", gap: "1rem",
                                    position: "relative", overflow: "hidden",
                                }}
                            >
                                {/* Left accent bar */}
                                <div style={{
                                    position: "absolute", left: 0, top: 0, bottom: 0,
                                    width: "3px",
                                    background: "linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.2))",
                                    borderRadius: "0 2px 2px 0",
                                }} />

                                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", minWidth: 0, paddingLeft: "0.5rem" }}>
                                    <div style={{
                                        width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                                        background: "rgba(79,70,229,0.1)", border: "1px solid rgba(99,102,241,0.15)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <Sword size={15} style={{ color: "#818cf8" }} strokeWidth={2} />
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>
                                            {inv.teams?.name || "Unknown Team"}
                                        </p>
                                        <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.75rem", marginTop: "0.1rem" }}>
                                            Dari{" "}
                                            <span style={{ color: "rgba(180,170,210,0.65)" }}>
                                                {inv.inviter?.username || "unknown"}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                                    <motion.button
                                        onClick={() => handleAccept(inv.id)}
                                        disabled={actionLoading === inv.id}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: "flex", alignItems: "center", gap: "0.35rem",
                                            padding: "0.45rem 0.9rem", borderRadius: "8px",
                                            fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                                            background: "rgba(79,70,229,0.12)", color: "#a5b4fc",
                                            border: "1px solid rgba(99,102,241,0.22)",
                                            opacity: actionLoading === inv.id ? 0.5 : 1,
                                            transition: "all 0.15s",
                                        }}
                                    >
                                        <CheckCircle2 size={12} />
                                        Terima
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleDecline(inv.id)}
                                        disabled={actionLoading === inv.id}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: "flex", alignItems: "center", gap: "0.35rem",
                                            padding: "0.45rem 0.9rem", borderRadius: "8px",
                                            fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                                            background: "transparent", color: "rgba(255,255,255,0.25)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            opacity: actionLoading === inv.id ? 0.5 : 1,
                                            transition: "all 0.15s",
                                        }}
                                    >
                                        <XCircle size={12} />
                                        Tolak
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

        </motion.div>
    )
}