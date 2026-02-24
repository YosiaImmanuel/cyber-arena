"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createTeam } from "@/actions/team"
import { Users, FileText, AlertCircle, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateTeamPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        setError(null)
        if (!name.trim()) return setError("Nama tim tidak boleh kosong")
        setLoading(true)
        const formData = new FormData()
        formData.append("name", name.trim())
        formData.append("description", description.trim())
        const result = await createTeam(formData)
        if (result.error) { setError(result.error); setLoading(false) }
        else router.push("/team")
    }

    const initials = name.trim()
        ? name.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
        : null

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "0.65rem 0.875rem",
        borderRadius: "10px", fontSize: "0.875rem",
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.07)",
        color: "#fff", outline: "none",
        transition: "border-color 0.2s",
        fontFamily: "inherit", boxSizing: "border-box",
    }

    const labelStyle: React.CSSProperties = {
        display: "block", fontSize: "0.7rem", fontWeight: 600,
        letterSpacing: "0.08em", color: "rgba(180,170,210,0.4)",
        textTransform: "uppercase", marginBottom: "0.4rem",
    }

    return (
        <>
            <style>{`
                .ct-input:focus { border-color: rgba(99,102,241,0.5) !important; }
                .ct-input::placeholder { color: rgba(180,170,210,0.25); }
            `}</style>

            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                    {/* ── Header ── */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                            <div style={{
                                width: "28px", height: "28px",
                                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                            }}>
                                <Users size={13} color="#fff" strokeWidth={2.2} />
                            </div>
                            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: "#818cf8", textTransform: "uppercase" }}>
                                Tim Baru
                            </span>
                        </div>
                        <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.3rem" }}>
                            Buat Tim
                        </h1>
                        <p style={{ color: "rgba(180,170,210,0.45)", fontSize: "0.875rem" }}>
                            Rekrut anggota dan mulai berkompetisi bersama.
                        </p>
                    </div>

                    <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

                    {/* ── Preview ── */}
                    <motion.div
                        layout
                        style={{
                            display: "flex", alignItems: "center", gap: "0.875rem",
                            padding: "0.875rem 1rem", borderRadius: "14px",
                            border: "1px solid rgba(255,255,255,0.07)",
                            position: "relative", overflow: "hidden",
                        }}
                    >
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />

                        {/* Avatar */}
                        <motion.div
                            key={initials || "empty"}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
                                background: initials ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "rgba(79,70,229,0.08)",
                                border: initials ? "none" : "1px solid rgba(99,102,241,0.15)",
                                boxShadow: initials ? "0 4px 12px rgba(79,70,229,0.3)" : "none",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "0.875rem", fontWeight: 800, color: initials ? "#fff" : "rgba(99,102,241,0.3)",
                            }}
                        >
                            {initials || <Users size={16} />}
                        </motion.div>

                        <div style={{ minWidth: 0, flex: 1 }}>
                            <p style={{
                                color: name.trim() ? "#fff" : "rgba(180,170,210,0.25)",
                                fontWeight: name.trim() ? 600 : 400, fontSize: "0.875rem",
                                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}>
                                {name.trim() || "Nama tim kamu..."}
                            </p>
                            <p style={{
                                color: "rgba(180,170,210,0.35)", fontSize: "0.75rem",
                                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                marginTop: "0.1rem",
                            }}>
                                {description.trim() || "Deskripsi tim"}
                            </p>
                        </div>
                    </motion.div>

                    {/* ── Form ── */}
                    <div style={{
                        border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px",
                        padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1.1rem",
                        position: "relative", overflow: "hidden",
                    }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />

                        {/* Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{
                                        display: "flex", alignItems: "center", gap: "0.6rem",
                                        padding: "0.75rem 0.875rem", borderRadius: "10px",
                                        background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)",
                                    }}
                                >
                                    <AlertCircle size={13} style={{ color: "#f87171", flexShrink: 0 }} />
                                    <span style={{ color: "#f87171", fontSize: "0.82rem" }}>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Nama */}
                        <div>
                            <label style={labelStyle}>
                                Nama Tim <span style={{ color: "#818cf8" }}>*</span>
                            </label>
                            <input
                                className="ct-input"
                                placeholder="Masukkan nama tim"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                                style={inputStyle}
                            />
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label style={labelStyle}>
                                Deskripsi{" "}
                                <span style={{ color: "rgba(180,170,210,0.3)", fontWeight: 400, letterSpacing: 0, textTransform: "none" }}>
                                    (opsional)
                                </span>
                            </label>
                            <textarea
                                className="ct-input"
                                placeholder="Ceritakan sedikit tentang tim kamu..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={3}
                                style={{ ...inputStyle, resize: "none" }}
                            />
                        </div>

                        {/* Submit */}
                        <motion.button
                            onClick={handleSubmit}
                            disabled={loading || !name.trim()}
                            whileHover={{ scale: loading || !name.trim() ? 1 : 1.03, boxShadow: "0 0 24px rgba(99,102,241,0.4)" }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                color: "#fff", fontWeight: 600, fontSize: "0.875rem",
                                padding: "0.75rem", borderRadius: "999px",
                                border: "1px solid rgba(99,102,241,0.35)", cursor: loading || !name.trim() ? "not-allowed" : "pointer",
                                boxShadow: "0 4px 16px rgba(79,70,229,0.3)",
                                opacity: loading || !name.trim() ? 0.55 : 1,
                                transition: "opacity 0.2s", fontFamily: "inherit",
                            }}
                        >
                            {loading ? (
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        width: 16, height: 16, borderRadius: "50%", display: "inline-block",
                                        border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
                                    }}
                                />
                            ) : (
                                <><Plus size={14} /> Buat Tim</>
                            )}
                        </motion.button>
                    </div>

                    {/* Tip */}
                    <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(180,170,210,0.3)" }}>
                        Setelah tim dibuat, kamu bisa mengundang anggota dan mendaftar turnamen.
                    </p>

                </motion.div>
            </div>
        </>
    )
}