"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { createTournament } from "@/actions/tournament"
import {
    Trophy, Calendar, DollarSign, FileText,
    Loader2, ChevronDown, CalendarDays, Image, Users
} from "lucide-react"
import Link from "next/link"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"]
const GAME_CATEGORIES = [
    "Mobile Legends", "Free Fire", "PUBG Mobile",
    "CODM", "HOK", "CS GO", "Valorant", "DOTA 2", "League of Legends"
]

function DatePicker({ name, value, onChange, label }: {
    name: string; value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const parsed = value ? new Date(value + "T00:00:00") : null
    const day = parsed ? String(parsed.getDate()).padStart(2, "0") : null
    const month = parsed ? MONTHS[parsed.getMonth()] : null
    const year = parsed ? parsed.getFullYear() : null

    return (
        <div style={{ flex: 1 }}>
            <label style={{
                display: "block", fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.08em", color: "rgba(180,170,210,0.4)",
                textTransform: "uppercase", marginBottom: "0.4rem",
            }}>
                {label}
            </label>
            <div
                onClick={() => { inputRef.current?.showPicker?.(); inputRef.current?.focus() }}
                style={{
                    position: "relative", display: "flex", alignItems: "stretch",
                    borderRadius: "10px", overflow: "hidden", cursor: "pointer",
                    border: value ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    transition: "border-color 0.2s",
                }}
            >
                <input
                    ref={inputRef}
                    type="date" name={name} value={value} onChange={onChange}
                    style={{ position: "absolute", inset: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer" }}
                    tabIndex={-1}
                />
                {/* Day */}
                <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    width: "44px", padding: "0.6rem 0", borderRight: "1px solid rgba(255,255,255,0.06)",
                    background: value ? "rgba(79,70,229,0.1)" : "rgba(255,255,255,0.02)",
                    flexShrink: 0,
                }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 800, color: value ? "#fff" : "rgba(255,255,255,0.2)", lineHeight: 1 }}>
                        {day ?? "--"}
                    </span>
                    <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: value ? "#818cf8" : "rgba(255,255,255,0.15)", marginTop: "2px" }}>
                        {month ?? "bln"}
                    </span>
                </div>
                {/* Year */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0.65rem", flex: 1 }}>
                    <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: value ? "#818cf8" : "rgba(255,255,255,0.2)" }}>
                        {value ? "Terpilih" : "Pilih"}
                    </span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: value ? "#fff" : "rgba(255,255,255,0.2)" }}>
                        {year ?? "—"}
                    </span>
                </div>
                {/* Icon */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "34px", borderLeft: "1px solid rgba(255,255,255,0.06)",
                    color: value ? "#818cf8" : "rgba(255,255,255,0.2)",
                }}>
                    <CalendarDays size={13} />
                </div>
            </div>
        </div>
    )
}

export default function CreateTournamentPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [form, setForm] = useState({
        name: "", game_category: "", description: "", prize_pool: "",
        max_slots: "8", google_form_url: "", banner_url: "",
        registration_start: "", registration_end: "",
        tournament_start: "", tournament_end: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const result = await createTournament({
            name: form.name, game_category: form.game_category,
            description: form.description || undefined, prize_pool: form.prize_pool || undefined,
            max_slots: parseInt(form.max_slots), google_form_url: form.google_form_url,
            banner_url: form.banner_url || undefined,
            registration_start: form.registration_start || undefined,
            registration_end: form.registration_end || undefined,
            tournament_start: form.tournament_start || undefined,
            tournament_end: form.tournament_end || undefined,
        })
        if (result.error) { setError(result.error); setLoading(false); return }
        router.push("/tournament")
        router.refresh()
    }

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
    const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "0.65rem 0.875rem",
        borderRadius: "10px", fontSize: "0.875rem",
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.07)",
        color: "#fff", outline: "none",
        transition: "border-color 0.2s",
        fontFamily: "inherit",
        boxSizing: "border-box",
    }

    const labelStyle: React.CSSProperties = {
        display: "block", fontSize: "0.7rem", fontWeight: 600,
        letterSpacing: "0.08em", color: "rgba(180,170,210,0.4)",
        textTransform: "uppercase", marginBottom: "0.4rem",
    }

    const sectionStyle: React.CSSProperties = {
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px", padding: "1.25rem",
        display: "flex", flexDirection: "column", gap: "1.1rem",
        position: "relative", overflow: "hidden",
    }

    return (
        <>
            <style>{`
                .ct-input:focus { border-color: rgba(99,102,241,0.5) !important; }
                .ct-input::placeholder { color: rgba(180,170,210,0.25); }
                .ct-input option { background: #0e0916; }

                @media (max-width: 560px) {
                    .date-row { flex-direction: column !important; }
                    .prize-row { grid-template-columns: 1fr !important; }
                }
            `}</style>

            <motion.div
                variants={container} initial="hidden" animate="show"
                style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
                {/* ── Header ── */}
                <motion.div variants={item}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <div style={{
                            width: "28px", height: "28px",
                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                            borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                        }}>
                            <Trophy size={13} color="#fff" strokeWidth={2.2} />
                        </div>
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: "#818cf8", textTransform: "uppercase" }}>
                            Buat Turnamen
                        </span>
                    </div>
                    <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.3rem" }}>
                        Turnamen Baru
                    </h1>
                    <p style={{ color: "rgba(180,170,210,0.45)", fontSize: "0.875rem" }}>
                        Isi detail turnamen yang ingin kamu adakan.
                    </p>
                </motion.div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

                <motion.form variants={item} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                    {/* ── Informasi Dasar ── */}
                    <div style={sectionStyle}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />
                        <SectionLabel icon={<FileText size={12} />} label="Informasi Dasar" />

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                            <div>
                                <label style={labelStyle}>Nama Turnamen <Required /></label>
                                <input
                                    className="ct-input" name="name" value={form.name} onChange={handleChange}
                                    required placeholder="Contoh: Cyber Arena Cup Season 1"
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label style={labelStyle}>Game <Required /></label>
                                <div style={{ position: "relative" }}>
                                    <select
                                        className="ct-input" name="game_category" value={form.game_category}
                                        onChange={handleChange} required
                                        style={{ ...inputStyle, appearance: "none", cursor: "pointer", paddingRight: "2.5rem" }}
                                    >
                                        <option value="" disabled>Pilih game...</option>
                                        {GAME_CATEGORIES.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                    <ChevronDown size={13} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "rgba(180,170,210,0.35)", pointerEvents: "none" }} />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Link Google Form <Required /></label>
                                <input
                                    className="ct-input" name="google_form_url" value={form.google_form_url}
                                    onChange={handleChange} required placeholder="https://forms.gle/..."
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label style={labelStyle}>Deskripsi</label>
                                <textarea
                                    className="ct-input" name="description" value={form.description}
                                    onChange={handleChange} rows={3}
                                    placeholder="Aturan, format, atau info tambahan..."
                                    style={{ ...inputStyle, resize: "none" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Banner ── */}
                    <div style={sectionStyle}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />
                        <SectionLabel icon={<Image size={12} />} label="Banner" />

                        <div>
                            <label style={labelStyle}>URL Banner</label>
                            <input
                                className="ct-input" name="banner_url" value={form.banner_url}
                                onChange={handleChange} placeholder="https://i.imgur.com/..."
                                style={inputStyle}
                            />
                            <p style={{ fontSize: "0.72rem", color: "rgba(180,170,210,0.3)", marginTop: "0.35rem" }}>
                                Kosongkan jika tidak ada banner.
                            </p>
                        </div>

                        {form.banner_url && (
                            <div style={{ borderRadius: "10px", overflow: "hidden", height: "140px", border: "1px solid rgba(255,255,255,0.07)", position: "relative" }}>
                                <img
                                    src={form.banner_url} alt="Preview"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
                                />
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,3,13,0.7), transparent)" }} />
                                <span style={{ position: "absolute", bottom: "8px", left: "10px", fontSize: "0.65rem", fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Preview</span>
                            </div>
                        )}
                    </div>

                    {/* ── Hadiah & Slot ── */}
                    <div style={sectionStyle}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />
                        <SectionLabel icon={<DollarSign size={12} />} label="Hadiah & Slot" />

                        <div className="prize-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                            <div>
                                <label style={labelStyle}>Prize Pool</label>
                                <input
                                    className="ct-input" name="prize_pool" value={form.prize_pool}
                                    onChange={handleChange} placeholder="Rp 500.000"
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Maks. Slot <Required /></label>
                                <input
                                    className="ct-input" name="max_slots" type="number"
                                    min="2" max="256" value={form.max_slots}
                                    onChange={handleChange} required
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Jadwal ── */}
                    <div style={sectionStyle}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />
                        <SectionLabel icon={<Calendar size={12} />} label="Jadwal" />

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>
                                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(180,170,210,0.3)", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                                    Periode Pendaftaran
                                </p>
                                <div className="date-row" style={{ display: "flex", gap: "0.75rem" }}>
                                    <DatePicker name="registration_start" value={form.registration_start} onChange={handleChange} label="Mulai" />
                                    <DatePicker name="registration_end" value={form.registration_end} onChange={handleChange} label="Batas" />
                                </div>
                            </div>

                            <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

                            <div>
                                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(180,170,210,0.3)", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                                    Pelaksanaan Turnamen
                                </p>
                                <div className="date-row" style={{ display: "flex", gap: "0.75rem" }}>
                                    <DatePicker name="tournament_start" value={form.tournament_start} onChange={handleChange} label="Mulai" />
                                    <DatePicker name="tournament_end" value={form.tournament_end} onChange={handleChange} label="Selesai" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Error ── */}
                    {error && (
                        <div style={{
                            display: "flex", alignItems: "center", gap: "0.75rem",
                            padding: "0.875rem 1.1rem", borderRadius: "12px",
                            background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)",
                        }}>
                            <div style={{ width: "3px", alignSelf: "stretch", background: "#f87171", borderRadius: "2px", flexShrink: 0 }} />
                            <p style={{ color: "#f87171", fontSize: "0.875rem" }}>{error}</p>
                        </div>
                    )}

                    {/* ── Submit ── */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingBottom: "2rem" }}>
                        <motion.button
                            type="submit" disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.03, boxShadow: "0 0 24px rgba(99,102,241,0.4)" }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: "flex", alignItems: "center", gap: "0.5rem",
                                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                color: "#fff", fontWeight: 600, fontSize: "0.875rem",
                                padding: "0.7rem 1.6rem", borderRadius: "999px",
                                border: "1px solid rgba(99,102,241,0.35)", cursor: loading ? "not-allowed" : "pointer",
                                boxShadow: "0 4px 16px rgba(79,70,229,0.3)",
                                opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
                                fontFamily: "inherit",
                            }}
                        >
                            {loading
                                ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} style={{ display: "flex" }}><Loader2 size={14} /></motion.span> Membuat...</>
                                : <><Trophy size={14} /> Buat Turnamen</>
                            }
                        </motion.button>

                        <Link href="/tournament" style={{ textDecoration: "none" }}>
                            <motion.button
                                type="button"
                                whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: "0.7rem 1.25rem", borderRadius: "999px",
                                    fontSize: "0.875rem", fontWeight: 500,
                                    color: "rgba(180,170,210,0.5)", cursor: "pointer",
                                    background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
                                    transition: "all 0.2s", fontFamily: "inherit",
                                }}
                            >
                                Batal
                            </motion.button>
                        </Link>
                    </div>
                </motion.form>
            </motion.div>
        </>
    )
}

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
                width: "24px", height: "24px", borderRadius: "7px",
                background: "rgba(79,70,229,0.1)", border: "1px solid rgba(99,102,241,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#818cf8",
            }}>
                {icon}
            </div>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                {label}
            </span>
        </div>
    )
}

function Required() {
    return <span style={{ color: "#818cf8" }}>*</span>
}