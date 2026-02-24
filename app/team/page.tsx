"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getMyTeam, getMyInvitations, acceptInvitation, declineInvitation, leaveTeam, kickMember } from "@/actions/team"
import {
    Users, Crown, UserMinus, UserPlus, LogOut,
    CheckCircle2, XCircle, AlertCircle, Sword, Plus
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

    useEffect(() => { loadData() }, [])

    async function loadData() {
        setLoading(true)
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) setCurrentUserId(user.id)
        setTeam(await getMyTeam())
        setInvitations(await getMyInvitations())
        setLoading(false)
    }

    const handleAccept = async (id: string) => {
        setActionLoading(id); setError(null)
        const result = await acceptInvitation(id)
        if (result.error) { setError(result.error) }
        else { setSuccess("Berhasil bergabung!"); setInvitations(prev => prev.filter(i => i.id !== id)); await loadData() }
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
        if (result.error) setError(result.error)
        else { setTeam(null); setSuccess("Berhasil keluar dari tim") }
        setActionLoading(null)
    }

    const handleKick = async (memberId: string, memberName: string) => {
        if (!confirm(`Yakin ingin mengeluarkan ${memberName}?`)) return
        setActionLoading(memberId)
        const result = await kickMember(memberId)
        if (result.error) setError(result.error)
        else { setSuccess(`${memberName} dikeluarkan`); await loadData() }
        setActionLoading(null)
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

    const isLeader = team?.leader_id === currentUserId

    return (
        <motion.div variants={container} initial="hidden" animate="show"
            style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
            {/* ── Header ── */}
            <motion.div variants={item}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <div style={{
                        width: "28px", height: "28px", background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                        borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                    }}>
                        <Users size={13} color="#fff" strokeWidth={2.2} />
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: "#818cf8", textTransform: "uppercase" }}>
                        Tim Saya
                    </span>
                </div>
                <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                    {team ? team.name : "Belum Ada Tim"}
                </h1>
            </motion.div>

            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

            {/* ── Feedback ── */}
            <AnimatePresence>
                {error && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.85rem 1rem", borderRadius: "12px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)" }}
                    >
                        <AlertCircle size={14} style={{ color: "#f87171", flexShrink: 0 }} />
                        <span style={{ color: "#f87171", fontSize: "0.85rem" }}>{error}</span>
                    </motion.div>
                )}
                {success && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.85rem 1rem", borderRadius: "12px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(52,211,153,0.18)" }}
                    >
                        <CheckCircle2 size={14} style={{ color: "#34d399", flexShrink: 0 }} />
                        <span style={{ color: "#34d399", fontSize: "0.85rem" }}>{success}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── No Team State ── */}
            {!team && (
                <motion.div variants={item} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{
                        textAlign: "center", padding: "3rem 1.5rem",
                        border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px",
                    }}>
                        <div style={{
                            width: "48px", height: "48px", borderRadius: "14px",
                            background: "rgba(79,70,229,0.08)", border: "1px solid rgba(99,102,241,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem",
                        }}>
                            <Users size={20} style={{ color: "rgba(99,102,241,0.4)" }} />
                        </div>
                        <h2 style={{ color: "#fff", fontWeight: 600, fontSize: "1rem", marginBottom: "0.4rem" }}>Belum bergabung ke tim</h2>
                        <p style={{ color: "rgba(180,170,210,0.45)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                            Buat tim baru atau tunggu undangan dari tim lain.
                        </p>
                        <Link href="/team/create" style={{ textDecoration: "none" }}>
                            <motion.span
                                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                                    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                    color: "#fff", fontWeight: 600, fontSize: "0.85rem",
                                    padding: "0.6rem 1.4rem", borderRadius: "999px",
                                    border: "1px solid rgba(99,102,241,0.35)",
                                    boxShadow: "0 4px 16px rgba(79,70,229,0.3)",
                                }}
                            >
                                <Plus size={13} /> Buat Tim Baru
                            </motion.span>
                        </Link>
                    </div>

                    {/* Invitations */}
                    {invitations.length > 0 && <InvitationList invitations={invitations} actionLoading={actionLoading} onAccept={handleAccept} onDecline={handleDecline} />}
                </motion.div>
            )}

            {/* ── Team View ── */}
            {team && (
                <>
                    {/* Team Info */}
                    <motion.div variants={item} style={{
                        border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px",
                        padding: "1.25rem", position: "relative", overflow: "hidden",
                    }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />

                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                                    <div style={{
                                        width: "32px", height: "32px", borderRadius: "9px", flexShrink: 0,
                                        background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                        boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <Sword size={14} color="#fff" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.01em" }}>{team.name}</p>
                                        {team.description && (
                                            <p style={{ color: "rgba(180,170,210,0.45)", fontSize: "0.78rem", marginTop: "0.1rem" }}>{team.description}</p>
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                                    <Users size={11} style={{ color: "#818cf8" }} />
                                    <span style={{ fontSize: "0.75rem", color: "rgba(180,170,210,0.45)" }}>
                                        {team.team_members?.length || 0} anggota
                                    </span>
                                </div>
                            </div>

                            {isLeader && (
                                <Link href="/team/invite" style={{ textDecoration: "none" }}>
                                    <motion.span
                                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: "0.4rem",
                                            background: "rgba(79,70,229,0.1)", color: "#a5b4fc",
                                            fontWeight: 600, fontSize: "0.78rem",
                                            padding: "0.45rem 1rem", borderRadius: "999px",
                                            border: "1px solid rgba(99,102,241,0.22)",
                                        }}
                                    >
                                        <UserPlus size={12} /> Undang
                                    </motion.span>
                                </Link>
                            )}
                        </div>
                    </motion.div>

                    {/* Members */}
                    <motion.div variants={item}>
                        <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "0.875rem" }}>
                            Anggota Tim
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {team.team_members?.map((member: any) => {
                                const profile = member.profiles
                                const memberIsLeader = member.role === "leader"
                                return (
                                    <div key={member.id} style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        gap: "1rem", padding: "0.85rem 1rem", borderRadius: "12px",
                                        border: memberIsLeader ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(255,255,255,0.06)",
                                        position: "relative", overflow: "hidden",
                                    }}>
                                        {memberIsLeader && (
                                            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: "linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.2))", borderRadius: "0 2px 2px 0" }} />
                                        )}

                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingLeft: memberIsLeader ? "0.5rem" : 0 }}>
                                            <div style={{
                                                width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
                                                background: memberIsLeader ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "rgba(255,255,255,0.05)",
                                                border: memberIsLeader ? "none" : "1px solid rgba(255,255,255,0.07)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "0.8rem", fontWeight: 700, color: "#fff",
                                            }}>
                                                {profile?.username?.[0]?.toUpperCase() || "?"}
                                            </div>
                                            <div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>
                                                        {profile?.username || "Unknown"}
                                                    </span>
                                                    {memberIsLeader && (
                                                        <span style={{
                                                            display: "inline-flex", alignItems: "center", gap: "0.25rem",
                                                            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em",
                                                            padding: "0.1rem 0.45rem", borderRadius: "999px",
                                                            background: "rgba(79,70,229,0.12)", color: "#818cf8",
                                                            border: "1px solid rgba(99,102,241,0.2)",
                                                        }}>
                                                            <Crown size={9} /> Leader
                                                        </span>
                                                    )}
                                                </div>
                                                {profile?.full_name && (
                                                    <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.72rem", marginTop: "0.1rem" }}>{profile.full_name}</p>
                                                )}
                                            </div>
                                        </div>

                                        {isLeader && !memberIsLeader && (
                                            <motion.button
                                                onClick={() => handleKick(member.id, profile?.username || "member")}
                                                disabled={actionLoading === member.id}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    display: "flex", alignItems: "center", gap: "0.35rem",
                                                    padding: "0.4rem 0.8rem", borderRadius: "8px",
                                                    fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                                                    background: "transparent", color: "rgba(248,113,113,0.6)",
                                                    border: "1px solid rgba(239,68,68,0.15)",
                                                    opacity: actionLoading === member.id ? 0.5 : 1,
                                                    transition: "all 0.15s", fontFamily: "inherit",
                                                }}
                                            >
                                                <UserMinus size={12} /> Kick
                                            </motion.button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div variants={item} style={{ display: "flex", gap: "0.75rem", paddingBottom: "2rem" }}>
                        {isLeader && (
                            <Link href="/team/invite" style={{ textDecoration: "none" }}>
                                <motion.span
                                    whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.4)" }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                                        background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                        color: "#fff", fontWeight: 600, fontSize: "0.875rem",
                                        padding: "0.7rem 1.6rem", borderRadius: "999px",
                                        border: "1px solid rgba(99,102,241,0.35)",
                                        boxShadow: "0 4px 16px rgba(79,70,229,0.3)",
                                    }}
                                >
                                    <UserPlus size={14} /> Undang Anggota
                                </motion.span>
                            </Link>
                        )}
                        {!isLeader && (
                            <motion.button
                                onClick={handleLeave} disabled={actionLoading === "leave"}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                                    padding: "0.7rem 1.6rem", borderRadius: "999px",
                                    fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
                                    background: "transparent", color: "rgba(248,113,113,0.7)",
                                    border: "1px solid rgba(239,68,68,0.18)",
                                    opacity: actionLoading === "leave" ? 0.5 : 1,
                                    transition: "opacity 0.2s", fontFamily: "inherit",
                                }}
                            >
                                <LogOut size={14} /> Keluar Tim
                            </motion.button>
                        )}
                    </motion.div>
                </>
            )}

            {/* Invitations (when has team) */}
            {team && invitations.length > 0 && (
                <motion.div variants={item}>
                    <InvitationList invitations={invitations} actionLoading={actionLoading} onAccept={handleAccept} onDecline={handleDecline} />
                </motion.div>
            )}
        </motion.div>
    )
}

function InvitationList({ invitations, actionLoading, onAccept, onDecline }: {
    invitations: any[]; actionLoading: string | null
    onAccept: (id: string) => void; onDecline: (id: string) => void
}) {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.875rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
                    Undangan Masuk
                </p>
                <span style={{
                    fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.55rem",
                    borderRadius: "999px", background: "rgba(99,102,241,0.12)", color: "#818cf8",
                    border: "1px solid rgba(99,102,241,0.2)", letterSpacing: "0.05em",
                }}>
                    {invitations.length} BARU
                </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {invitations.map((inv: any) => (
                    <div key={inv.id} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        gap: "1rem", padding: "0.85rem 1rem", borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.07)", position: "relative", overflow: "hidden",
                    }}>
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: "linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.2))", borderRadius: "0 2px 2px 0" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingLeft: "0.5rem" }}>
                            <div style={{
                                width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
                                background: "rgba(79,70,229,0.1)", border: "1px solid rgba(99,102,241,0.15)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Sword size={14} style={{ color: "#818cf8" }} strokeWidth={2} />
                            </div>
                            <div>
                                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{inv.teams?.name}</p>
                                <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.72rem", marginTop: "0.1rem" }}>
                                    Dari <span style={{ color: "rgba(180,170,210,0.65)" }}>{inv.inviter?.username}</span>
                                </p>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                            <motion.button
                                onClick={() => onAccept(inv.id)} disabled={actionLoading === inv.id}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.35rem",
                                    padding: "0.45rem 0.9rem", borderRadius: "8px",
                                    fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                                    background: "rgba(79,70,229,0.12)", color: "#a5b4fc",
                                    border: "1px solid rgba(99,102,241,0.22)",
                                    opacity: actionLoading === inv.id ? 0.5 : 1, fontFamily: "inherit",
                                }}
                            >
                                <CheckCircle2 size={12} /> Terima
                            </motion.button>
                            <motion.button
                                onClick={() => onDecline(inv.id)} disabled={actionLoading === inv.id}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.35rem",
                                    padding: "0.45rem 0.9rem", borderRadius: "8px",
                                    fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                                    background: "transparent", color: "rgba(255,255,255,0.25)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    opacity: actionLoading === inv.id ? 0.5 : 1, fontFamily: "inherit",
                                }}
                            >
                                <XCircle size={12} /> Tolak
                            </motion.button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}