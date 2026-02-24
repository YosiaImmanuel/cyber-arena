"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion, AnimatePresence } from "framer-motion"
import {
    Users, Trophy, Edit3, Check, X, Loader2,
    Swords, Shield, Sword, ChevronRight
} from "lucide-react"

interface TeamMemberWithTeam {
    role: string
    teams: { name: string; description: string | null }
}

interface Registration {
    status: string
    tournaments: { name: string; game_category: string } | null
}

const STATUS_MAP: Record<string, { label: string; dot: string }> = {
    approved: { label: "Terdaftar", dot: "rgba(134,239,172,0.8)" },
    pending:  { label: "Pending",   dot: "rgba(252,211,77,0.8)"  },
    rejected: { label: "Ditolak",   dot: "rgba(248,113,113,0.8)" },
}

export default function ProfileClient() {
    const [userId, setUserId]               = useState("")
    const [username, setUsername]           = useState("")
    const [email, setEmail]                 = useState("")
    const [teamMember, setTeamMember]       = useState<TeamMemberWithTeam | null>(null)
    const [registrations, setRegistrations] = useState<Registration[]>([])
    const [pageLoading, setPageLoading]     = useState(true)
    const [isEditing, setIsEditing]         = useState(false)
    const [editUsername, setEditUsername]   = useState("")
    const [loading, setLoading]             = useState(false)
    const [error, setError]                 = useState<string | null>(null)

    useEffect(() => {
        const fetchAll = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) { setPageLoading(false); return }

            setUserId(user.id)
            setEmail(user.email ?? "")

            const fallbackUsername = user.user_metadata?.username || user.email?.split("@")[0] || ""
            await supabase.from("profiles").upsert(
                { id: user.id, username: fallbackUsername },
                { onConflict: "id", ignoreDuplicates: true }
            )

            const { data: freshProfile } = await supabase
                .from("profiles").select("username").eq("id", user.id).single()
            const name = freshProfile?.username || fallbackUsername
            setUsername(name)
            setEditUsername(name)

            const { data: member } = await supabase
                .from("team_members")
                .select("role, teams(name, description)")
                .eq("user_id", user.id).single()
            if (member) setTeamMember(member as TeamMemberWithTeam)

            const { data: regs } = await supabase
                .from("tournament_registrations")
                .select("status, tournaments(name, game_category)")
                .eq("registered_by", user.id)
                .order("registered_at", { ascending: false })
            setRegistrations((regs as Registration[]) ?? [])
            setPageLoading(false)
        }
        fetchAll()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true); setError(null)
        const newUsername = editUsername.trim()
        if (!newUsername) { setError("Username tidak boleh kosong."); setLoading(false); return }
        const supabase = createClient()
        const { error: err } = await supabase
            .from("profiles").upsert({ id: userId, username: newUsername }, { onConflict: "id" })
        if (err) setError(err.message)
        else { setUsername(newUsername); setIsEditing(false) }
        setLoading(false)
    }

    const initials  = username?.[0]?.toUpperCase() ?? "?"
    const tourCount = registrations.length
    const accepted  = registrations.filter(r => r.status === "approved").length

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "0.65rem 0.875rem", borderRadius: "10px",
        fontSize: "0.875rem", background: "transparent",
        border: "1px solid rgba(255,255,255,0.07)", color: "#fff",
        outline: "none", transition: "border-color 0.2s",
        fontFamily: "inherit", boxSizing: "border-box",
    }

    if (pageLoading) return (
        <div style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[1, 2, 3].map(i => (
                <div key={i} style={{ height: "100px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", animation: "pulse 2s infinite" }} />
            ))}
        </div>
    )

    return (
        <>
            <style>{`
                .prof-input:focus { border-color: rgba(99,102,241,0.5) !important; }
                .prof-input::placeholder { color: rgba(180,170,210,0.25); }
            `}</style>

            <div style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>

                {/* ── Profile Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}
                >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)", position: "relative" }} />

                    <div style={{ padding: "1.25rem", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />

                        {/* Top row */}
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                            {/* Avatar */}
                            <div style={{ position: "relative", flexShrink: 0 }}>
                                <div style={{
                                    width: "56px", height: "56px", borderRadius: "14px",
                                    background: "linear-gradient(135deg, #4f46e5, #6366f1, #818cf8)",
                                    boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "1.25rem", fontWeight: 800, color: "#fff",
                                }}>
                                    {initials}
                                </div>
                                <span style={{
                                    position: "absolute", bottom: "-2px", right: "-2px",
                                    width: "12px", height: "12px", borderRadius: "50%",
                                    background: "#4ade80", border: "2px solid #05030d",
                                }} />
                            </div>

                            {/* Name + stats */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                                            <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>{username || "—"}</h2>
                                            {teamMember?.role === "leader" && (
                                                <span style={{
                                                    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em",
                                                    padding: "0.15rem 0.5rem", borderRadius: "999px",
                                                    background: "rgba(79,70,229,0.12)", color: "#818cf8",
                                                    border: "1px solid rgba(99,102,241,0.2)", textTransform: "uppercase",
                                                }}>Leader</span>
                                            )}
                                        </div>
                                        <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.8rem", marginTop: "0.15rem" }}>{email}</p>
                                    </div>

                                    <motion.button
                                        onClick={() => { setIsEditing(!isEditing); setEditUsername(username); setError(null) }}
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: "flex", alignItems: "center", gap: "0.35rem",
                                            padding: "0.4rem 0.75rem", borderRadius: "8px",
                                            fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                                            background: "transparent", color: "rgba(180,170,210,0.5)",
                                            border: "1px solid rgba(255,255,255,0.08)", fontFamily: "inherit",
                                            transition: "all 0.15s", flexShrink: 0,
                                        }}
                                    >
                                        {isEditing ? <X size={12} /> : <Edit3 size={12} />}
                                        <span style={{ display: "none" }} className="sm-show">{isEditing ? "Batal" : "Edit"}</span>
                                    </motion.button>
                                </div>

                                {/* Stat pills */}
                                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                                    {[
                                        { icon: <Trophy size={10} />, value: `${tourCount} Turnamen` },
                                        { icon: <Shield size={10} />, value: `${accepted} Diterima` },
                                        ...(teamMember ? [{ icon: <Users size={10} />, value: teamMember.teams?.name }] : []),
                                    ].map((s, i) => (
                                        <div key={i} style={{
                                            display: "flex", alignItems: "center", gap: "0.35rem",
                                            padding: "0.3rem 0.7rem", borderRadius: "999px",
                                            background: "rgba(79,70,229,0.08)", border: "1px solid rgba(99,102,241,0.15)",
                                            color: "#a5b4fc", fontSize: "0.72rem", fontWeight: 600,
                                        }}>
                                            {s.icon}
                                            <span style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "1.1rem 0" }} />

                        {/* Edit form or info */}
                        <AnimatePresence mode="wait">
                            {isEditing ? (
                                <motion.form
                                    key="edit"
                                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                    onSubmit={handleSubmit}
                                    style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
                                >
                                    <div>
                                        <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(180,170,210,0.4)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                                            Username baru
                                        </label>
                                        <input
                                            className="prof-input" value={editUsername}
                                            onChange={e => setEditUsername(e.target.value)}
                                            placeholder="Masukkan username..." style={inputStyle}
                                        />
                                    </div>

                                    {error && (
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 0.875rem", borderRadius: "10px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)" }}>
                                            <X size={12} style={{ color: "#f87171", flexShrink: 0 }} />
                                            <span style={{ color: "#f87171", fontSize: "0.82rem" }}>{error}</span>
                                        </div>
                                    )}

                                    <div style={{ display: "flex", gap: "0.6rem" }}>
                                        <motion.button
                                            type="submit" disabled={loading}
                                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                            style={{
                                                display: "flex", alignItems: "center", gap: "0.4rem",
                                                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                                color: "#fff", fontWeight: 600, fontSize: "0.85rem",
                                                padding: "0.6rem 1.25rem", borderRadius: "999px",
                                                border: "1px solid rgba(99,102,241,0.35)", cursor: loading ? "not-allowed" : "pointer",
                                                opacity: loading ? 0.7 : 1, fontFamily: "inherit",
                                                boxShadow: "0 4px 12px rgba(79,70,229,0.25)",
                                            }}
                                        >
                                            {loading
                                                ? <><Loader2 size={13} style={{ animation: "spin 0.8s linear infinite" }} /> Menyimpan...</>
                                                : <><Check size={13} /> Simpan</>
                                            }
                                        </motion.button>
                                        <motion.button
                                            type="button" whileTap={{ scale: 0.97 }}
                                            onClick={() => { setIsEditing(false); setError(null) }}
                                            style={{
                                                padding: "0.6rem 1.1rem", borderRadius: "999px",
                                                fontSize: "0.85rem", fontWeight: 500, cursor: "pointer",
                                                background: "transparent", color: "rgba(180,170,210,0.45)",
                                                border: "1px solid rgba(255,255,255,0.08)", fontFamily: "inherit",
                                            }}
                                        >Batal</motion.button>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="info"
                                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.6rem" }}
                                >
                                    {[
                                        { label: "Username", value: username || "—" },
                                        { label: "Email",    value: email },
                                    ].map(({ label, value }) => (
                                        <div key={label} style={{ padding: "0.7rem 0.875rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                                            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(180,170,210,0.35)", textTransform: "uppercase", marginBottom: "0.25rem" }}>{label}</p>
                                            <p style={{ fontSize: "0.875rem", color: "#fff", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* ── Team Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                    style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}
                >
                    <div style={{ padding: "1.1rem 1.25rem", position: "relative" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
                            <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "rgba(79,70,229,0.1)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Users size={12} style={{ color: "#818cf8" }} />
                            </div>
                            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>Tim Saya</span>
                        </div>

                        {teamMember ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <div style={{
                                    width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
                                    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                    boxShadow: "0 4px 12px rgba(99,102,241,0.25)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "0.875rem", fontWeight: 800, color: "#fff",
                                }}>
                                    {teamMember.teams?.name?.[0]?.toUpperCase()}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{teamMember.teams?.name}</p>
                                    <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.75rem", marginTop: "0.1rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {teamMember.teams?.description ?? "Tidak ada deskripsi"}
                                    </p>
                                </div>
                                <span style={{
                                    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                                    padding: "0.2rem 0.6rem", borderRadius: "999px", flexShrink: 0,
                                    background: "rgba(79,70,229,0.1)", color: "#818cf8",
                                    border: "1px solid rgba(99,102,241,0.2)",
                                    display: "flex", alignItems: "center", gap: "0.25rem",
                                }}>
                                    {teamMember.role === "leader" ? <Sword size={9} /> : <Shield size={9} />}
                                    {teamMember.role}
                                </span>
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(79,70,229,0.07)", border: "1px solid rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
                                    <Users size={17} style={{ color: "rgba(99,102,241,0.35)" }} />
                                </div>
                                <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.85rem", marginBottom: "1rem" }}>Belum bergabung dengan tim.</p>
                                <a href="/team/create" style={{ textDecoration: "none" }}>
                                    <motion.span
                                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: "0.4rem",
                                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                            color: "#fff", fontWeight: 600, fontSize: "0.8rem",
                                            padding: "0.5rem 1.1rem", borderRadius: "999px",
                                            border: "1px solid rgba(99,102,241,0.35)",
                                            boxShadow: "0 4px 12px rgba(79,70,229,0.25)",
                                        }}
                                    >Buat Tim</motion.span>
                                </a>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* ── Tournament History ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.16 }}
                    style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}
                >
                    <div style={{ padding: "1.1rem 1.25rem", position: "relative" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
                            <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "rgba(79,70,229,0.1)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Swords size={12} style={{ color: "#818cf8" }} />
                            </div>
                            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
                                Riwayat Turnamen
                            </span>
                            {registrations.length > 0 && (
                                <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "0.1rem 0.5rem", borderRadius: "999px", background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.18)" }}>
                                    {registrations.length}
                                </span>
                            )}
                        </div>

                        {registrations.length > 0 ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                                {registrations.map((reg, i) => {
                                    const status = STATUS_MAP[reg.status] ?? { label: reg.status, dot: "rgba(180,170,210,0.4)" }
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + i * 0.05 }}
                                            style={{
                                                display: "flex", alignItems: "center", gap: "0.875rem",
                                                padding: "0.75rem 0.875rem", borderRadius: "10px",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                                position: "relative", overflow: "hidden",
                                            }}
                                        >
                                            {/* left bar */}
                                            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: "linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(99,102,241,0.1))", borderRadius: "0 2px 2px 0" }} />

                                            <div style={{ paddingLeft: "0.5rem", flex: 1, minWidth: 0 }}>
                                                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {reg.tournaments?.name}
                                                </p>
                                                <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.72rem", marginTop: "0.1rem" }}>
                                                    {reg.tournaments?.game_category}
                                                </p>
                                            </div>

                                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
                                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: status.dot, display: "inline-block" }} />
                                                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(180,170,210,0.55)" }}>{status.label}</span>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(79,70,229,0.07)", border: "1px solid rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
                                    <Trophy size={17} style={{ color: "rgba(99,102,241,0.35)" }} />
                                </div>
                                <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.85rem", marginBottom: "1rem" }}>Belum pernah mendaftar turnamen.</p>
                                <a href="/tournament" style={{ textDecoration: "none" }}>
                                    <motion.span
                                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: "0.4rem",
                                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                            color: "#fff", fontWeight: 600, fontSize: "0.8rem",
                                            padding: "0.5rem 1.1rem", borderRadius: "999px",
                                            border: "1px solid rgba(99,102,241,0.35)",
                                            boxShadow: "0 4px 12px rgba(79,70,229,0.25)",
                                        }}
                                    >
                                        Browse Turnamen <ChevronRight size={12} />
                                    </motion.span>
                                </a>
                            </div>
                        )}
                    </div>
                </motion.div>

            </div>
        </>
    )
}