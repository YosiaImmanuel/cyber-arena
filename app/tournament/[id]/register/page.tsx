"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { getTournamentById, registerTournament } from "@/actions/tournament"
import { getMyTeam } from "@/actions/team"
import {
    Trophy, ExternalLink, Upload, ArrowLeft,
    CheckCircle2, AlertCircle, FileCheck, Shield, Sword
} from "lucide-react"
import Link from "next/link"

export default function RegisterTournamentPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const [tournament, setTournament] = useState<any>(null)
    const [team, setTeam] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [screenshot, setScreenshot] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [formOpened, setFormOpened] = useState(false)

    useEffect(() => {
        async function load() {
            const t = await getTournamentById(id)
            setTournament(t)
            setTeam(await getMyTeam())
            setLoading(false)
        }
        load()
    }, [id])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) { setScreenshot(file); setPreviewUrl(URL.createObjectURL(file)) }
    }

    const handleOpenForm = () => {
        if (tournament?.google_form_url) {
            window.open(tournament.google_form_url, "_blank")
            setFormOpened(true)
        }
    }

    const handleSubmit = async () => {
        setError(null)
        if (!formOpened) return setError("Isi Google Form terlebih dahulu")
        if (!screenshot) return setError("Upload screenshot bukti pengisian form")
        if (!team) return setError("Kamu harus punya tim")
        setSubmitting(true)
        const formData = new FormData()
        formData.append("tournament_id", id)
        formData.append("team_id", team.id)
        formData.append("screenshot", screenshot)
        const result = await registerTournament(formData)
        if (result.error) { setError(result.error); setSubmitting(false) }
        else setSuccess(true)
    }

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
    const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }

    const cardStyle: React.CSSProperties = {
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px", position: "relative", overflow: "hidden",
    }
    const accentLine = <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid rgba(99,102,241,0.2)", borderTopColor: "#6366f1" }}
            />
        </div>
    )

    if (success) return (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center", padding: "4rem 1.5rem" }}
        >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(52,211,153,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}
            >
                <CheckCircle2 size={28} style={{ color: "#34d399" }} />
            </motion.div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                Pendaftaran Berhasil!
            </h2>
            <p style={{ color: "rgba(180,170,210,0.5)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Tim <span style={{ color: "#a5b4fc", fontWeight: 600 }}>{team?.name}</span> telah berhasil mendaftar
                di turnamen <span style={{ color: "#fff", fontWeight: 600 }}>{tournament?.name}</span>.
                Tunggu konfirmasi dari organizer.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href={`/tournament/${id}`} style={{ textDecoration: "none" }}>
                    <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "0.4rem",
                            padding: "0.65rem 1.3rem", borderRadius: "999px", fontSize: "0.875rem", fontWeight: 600,
                            background: "transparent", color: "rgba(180,170,210,0.6)",
                            border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer",
                        }}
                    >Lihat Turnamen</motion.span>
                </Link>
                <Link href="/home" style={{ textDecoration: "none" }}>
                    <motion.span whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.4)" }} whileTap={{ scale: 0.97 }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "0.4rem",
                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                            color: "#fff", fontWeight: 600, fontSize: "0.875rem",
                            padding: "0.65rem 1.3rem", borderRadius: "999px",
                            border: "1px solid rgba(99,102,241,0.35)",
                            boxShadow: "0 4px 12px rgba(79,70,229,0.3)", cursor: "pointer",
                        }}
                    >Ke Beranda</motion.span>
                </Link>
            </div>
        </motion.div>
    )

    return (
        <motion.div variants={container} initial="hidden" animate="show"
            style={{ maxWidth: "520px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}
        >
            {/* ── Header ── */}
            <motion.div variants={item}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg, #4f46e5, #6366f1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
                        <Trophy size={13} color="#fff" strokeWidth={2.2} />
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: "#818cf8", textTransform: "uppercase" }}>Pendaftaran</span>
                </div>
                <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.3rem" }}>
                    Daftar Turnamen
                </h1>
                <p style={{ color: "rgba(180,170,210,0.45)", fontSize: "0.875rem" }}>
                    Ikuti langkah berikut untuk mendaftarkan tim kamu.
                </p>
            </motion.div>

            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

            {/* ── Tournament + Team Info ── */}
            <motion.div variants={item} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {/* Tournament */}
                <div style={{ ...cardStyle, padding: "0.875rem 1.1rem", display: "flex", alignItems: "center", gap: "0.875rem" }}>
                    {accentLine}
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0, background: "rgba(79,70,229,0.1)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Trophy size={15} style={{ color: "#818cf8" }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tournament?.name}</p>
                        <p style={{ color: "rgba(180,170,210,0.4)", fontSize: "0.75rem", marginTop: "0.1rem" }}>{tournament?.game_category}</p>
                    </div>
                </div>

                {/* Team */}
                <div style={{ ...cardStyle, padding: "0.875rem 1.1rem", display: "flex", alignItems: "center", gap: "0.875rem" }}>
                    {accentLine}
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0, background: "linear-gradient(135deg, #4f46e5, #6366f1)", boxShadow: "0 4px 12px rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Sword size={15} color="#fff" strokeWidth={2} />
                    </div>
                    <div>
                        <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(180,170,210,0.35)", textTransform: "uppercase", marginBottom: "0.1rem" }}>Tim Kamu</p>
                        <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{team?.name}</p>
                    </div>
                </div>
            </motion.div>

            {/* ── Step 1: Google Form ── */}
            <motion.div variants={item} style={{ ...cardStyle, padding: "1.1rem 1.25rem", border: `1px solid ${formOpened ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.07)"}` }}>
                {accentLine}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                    <div style={{
                        width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                        background: formOpened ? "rgba(16,185,129,0.1)" : "rgba(79,70,229,0.1)",
                        border: formOpened ? "1px solid rgba(52,211,153,0.25)" : "1px solid rgba(99,102,241,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.65rem", fontWeight: 800, color: formOpened ? "#34d399" : "#818cf8",
                    }}>
                        {formOpened ? <CheckCircle2 size={11} /> : "1"}
                    </div>
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Isi Google Form</span>
                </div>
                <p style={{ color: "rgba(180,170,210,0.45)", fontSize: "0.8rem", marginBottom: "0.875rem", lineHeight: 1.6 }}>
                    Buka dan isi formulir pendaftaran yang telah disediakan oleh organizer.
                </p>
                <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={handleOpenForm}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        padding: "0.55rem 1.1rem", borderRadius: "999px",
                        fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                        background: formOpened ? "rgba(16,185,129,0.08)" : "rgba(79,70,229,0.1)",
                        color: formOpened ? "#34d399" : "#a5b4fc",
                        border: formOpened ? "1px solid rgba(52,211,153,0.2)" : "1px solid rgba(99,102,241,0.22)",
                    }}
                >
                    {formOpened ? <><CheckCircle2 size={13} /> Form Sudah Dibuka</> : <><ExternalLink size={13} /> Buka Google Form</>}
                </motion.button>
            </motion.div>

            {/* ── Step 2: Upload Screenshot ── */}
            <motion.div variants={item} style={{ ...cardStyle, padding: "1.1rem 1.25rem", border: `1px solid ${screenshot ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.07)"}` }}>
                {accentLine}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                    <div style={{
                        width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                        background: screenshot ? "rgba(16,185,129,0.1)" : "rgba(79,70,229,0.1)",
                        border: screenshot ? "1px solid rgba(52,211,153,0.25)" : "1px solid rgba(99,102,241,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.65rem", fontWeight: 800, color: screenshot ? "#34d399" : "#818cf8",
                    }}>
                        {screenshot ? <CheckCircle2 size={11} /> : "2"}
                    </div>
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Upload Screenshot</span>
                </div>
                <p style={{ color: "rgba(180,170,210,0.45)", fontSize: "0.8rem", marginBottom: "0.875rem", lineHeight: 1.6 }}>
                    Upload screenshot sebagai bukti bahwa kamu sudah mengisi Google Form.
                </p>

                {previewUrl ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", maxHeight: "180px" }}>
                            <img src={previewUrl} alt="Preview" style={{ width: "100%", maxHeight: "180px", objectFit: "cover" }} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#34d399", fontSize: "0.75rem" }}>
                                <FileCheck size={13} />
                                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>{screenshot?.name}</span>
                            </div>
                            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(180,170,210,0.45)", cursor: "pointer", padding: "0.3rem 0.7rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
                                Ganti
                                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                            </label>
                        </div>
                    </div>
                ) : (
                    <label style={{
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        padding: "2rem", borderRadius: "12px", cursor: "pointer",
                        border: "2px dashed rgba(255,255,255,0.08)",
                        transition: "border-color 0.2s",
                    }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)")}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    >
                        <Upload size={24} style={{ color: "rgba(180,170,210,0.25)", marginBottom: "0.6rem" }} />
                        <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "rgba(180,170,210,0.4)" }}>Klik untuk upload screenshot</span>
                        <span style={{ fontSize: "0.72rem", color: "rgba(180,170,210,0.25)", marginTop: "0.25rem" }}>PNG, JPG, WEBP</span>
                        <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                    </label>
                )}
            </motion.div>

            {/* ── Error ── */}
            <AnimatePresence>
                {error && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.85rem 1rem", borderRadius: "12px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)" }}
                    >
                        <AlertCircle size={14} style={{ color: "#f87171", flexShrink: 0 }} />
                        <span style={{ color: "#f87171", fontSize: "0.85rem" }}>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Submit ── */}
            <motion.div variants={item} style={{ paddingBottom: "2rem" }}>
                <motion.button
                    whileHover={{ scale: submitting ? 1 : 1.02, boxShadow: "0 0 28px rgba(99,102,241,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                        background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                        color: "#fff", fontWeight: 700, fontSize: "0.975rem",
                        padding: "0.95rem", borderRadius: "14px",
                        border: "1px solid rgba(99,102,241,0.35)", cursor: submitting ? "not-allowed" : "pointer",
                        boxShadow: "0 4px 20px rgba(79,70,229,0.3)",
                        opacity: submitting ? 0.7 : 1, transition: "opacity 0.2s", fontFamily: "inherit",
                    }}
                >
                    {submitting ? (
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", display: "inline-block" }}
                        />
                    ) : (
                        <><Trophy size={17} /> Kirim Pendaftaran</>
                    )}
                </motion.button>
            </motion.div>
        </motion.div>
    )
}