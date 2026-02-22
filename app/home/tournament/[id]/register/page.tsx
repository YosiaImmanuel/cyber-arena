"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { getTournamentById, registerTournament } from "@/actions/tournament"
import { getMyTeam } from "@/actions/team"
import {
    Trophy, ExternalLink, Upload, ArrowLeft, CheckCircle2,
    AlertCircle, Image as ImageIcon, FileCheck, Shield
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

            const myTeam = await getMyTeam()
            setTeam(myTeam)

            setLoading(false)
        }
        load()
    }, [id])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setScreenshot(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
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

        if (result.error) {
            setError(result.error)
            setSubmitting(false)
        } else {
            setSuccess(true)
        }
    }

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
    const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full"
                />
            </div>
        )
    }

    // Success state
    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg mx-auto text-center py-16"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6"
                >
                    <CheckCircle2 size={40} className="text-emerald-400" />
                </motion.div>
                <h2 className="text-2xl font-extrabold text-white mb-2">Pendaftaran Berhasil! 🎉</h2>
                <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
                    Tim <span className="text-violet-400 font-semibold">{team?.name}</span> telah berhasil mendaftar
                    di tournament <span className="text-white font-semibold">{tournament?.name}</span>.
                    Tunggu konfirmasi dari organizer.
                </p>
                <div className="flex justify-center gap-3">
                    <Link href={`/home/tournament/${id}`}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 rounded-xl font-bold text-violet-400 text-sm cursor-pointer"
                            style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)" }}
                        >
                            Lihat Tournament
                        </motion.button>
                    </Link>
                    <Link href="/home">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 rounded-xl font-bold text-white text-sm cursor-pointer"
                            style={{ background: "linear-gradient(135deg, #9333ea, #7c3aed)" }}
                        >
                            Ke Beranda
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-lg mx-auto space-y-6">
            {/* Back */}
            <motion.div variants={item}>
                <Link
                    href={`/home/tournament/${id}`}
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-violet-400 transition-colors"
                >
                    <ArrowLeft size={14} />
                    Kembali ke detail tournament
                </Link>
            </motion.div>

            {/* Header */}
            <motion.div variants={item}>
                <div className="flex items-center gap-2 mb-2">
                    <Trophy size={16} className="text-violet-400" />
                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Pendaftaran</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white">Daftar Tournament</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Ikuti langkah-langkah berikut untuk mendaftarkan tim kamu.
                </p>
            </motion.div>

            {/* Tournament Info */}
            <motion.div
                variants={item}
                className="rounded-xl p-4 flex items-center gap-3"
                style={{
                    background: "rgba(28,16,42,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <div className="w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center">
                    <Trophy size={22} className="text-violet-400" />
                </div>
                <div>
                    <p className="text-white font-bold text-sm">{tournament?.name}</p>
                    <p className="text-gray-500 text-xs">{tournament?.game_category}</p>
                </div>
            </motion.div>

            {/* Team Info */}
            <motion.div
                variants={item}
                className="rounded-xl p-4 flex items-center gap-3"
                style={{
                    background: "rgba(28,16,42,0.6)",
                    border: "1px solid rgba(139,92,246,0.15)",
                }}
            >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center">
                    <Shield size={22} className="text-white" />
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Tim Kamu</p>
                    <p className="text-white font-bold text-sm">{team?.name}</p>
                </div>
            </motion.div>

            {/* Steps */}
            <motion.div variants={item} className="space-y-4">
                {/* Step 1: Isi Google Form */}
                <div
                    className="rounded-xl p-5"
                    style={{
                        background: "rgba(28,16,42,0.6)",
                        border: `1px solid ${formOpened ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`,
                    }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${formOpened ? "bg-emerald-500/20 text-emerald-400" : "bg-violet-500/20 text-violet-400"
                            }`}>
                            {formOpened ? <CheckCircle2 size={14} /> : "1"}
                        </div>
                        <h3 className="text-white font-bold text-sm">Isi Google Form</h3>
                    </div>
                    <p className="text-gray-400 text-xs mb-4">
                        Klik tombol di bawah untuk membuka dan mengisi formulir pendaftaran.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleOpenForm}
                        className="px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 cursor-pointer transition-all"
                        style={{
                            background: formOpened ? "rgba(34,197,94,0.1)" : "rgba(139,92,246,0.15)",
                            color: formOpened ? "#22c55e" : "#a78bfa",
                            border: `1px solid ${formOpened ? "rgba(34,197,94,0.3)" : "rgba(139,92,246,0.3)"}`,
                        }}
                    >
                        {formOpened ? (
                            <>
                                <CheckCircle2 size={15} />
                                Form Sudah Dibuka
                            </>
                        ) : (
                            <>
                                <ExternalLink size={15} />
                                Buka Google Form
                            </>
                        )}
                    </motion.button>
                </div>

                {/* Step 2: Upload Screenshot */}
                <div
                    className="rounded-xl p-5"
                    style={{
                        background: "rgba(28,16,42,0.6)",
                        border: `1px solid ${screenshot ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`,
                    }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${screenshot ? "bg-emerald-500/20 text-emerald-400" : "bg-violet-500/20 text-violet-400"
                            }`}>
                            {screenshot ? <CheckCircle2 size={14} /> : "2"}
                        </div>
                        <h3 className="text-white font-bold text-sm">Upload Screenshot</h3>
                    </div>
                    <p className="text-gray-400 text-xs mb-4">
                        Upload screenshot bukti bahwa kamu sudah mengisi Google Form.
                    </p>

                    {previewUrl ? (
                        <div className="space-y-3">
                            <div className="rounded-lg overflow-hidden border border-white/[0.08]">
                                <img src={previewUrl} alt="Screenshot preview" className="w-full max-h-48 object-cover" />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-emerald-400">
                                <FileCheck size={14} />
                                <span>{screenshot?.name}</span>
                            </div>
                            <label className="inline-block px-4 py-2 rounded-lg bg-white/[0.05] text-gray-400 text-xs font-semibold cursor-pointer hover:bg-white/[0.08] transition-colors border border-white/[0.08]">
                                Ganti Screenshot
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    ) : (
                        <label
                            className="flex flex-col items-center justify-center py-8 rounded-xl cursor-pointer transition-all border-2 border-dashed border-white/[0.1] hover:border-violet-500/40 hover:bg-violet-500/[0.03]"
                        >
                            <Upload size={28} className="text-gray-600 mb-2" />
                            <span className="text-gray-500 text-xs font-medium">Klik untuk upload screenshot</span>
                            <span className="text-gray-600 text-[10px] mt-1">PNG, JPG, WEBP</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            </motion.div>

            {/* Error */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl text-sm"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                    <AlertCircle size={16} className="text-red-400 shrink-0" />
                    <span className="text-red-400">{error}</span>
                </motion.div>
            )}

            {/* Submit */}
            <motion.div variants={item}>
                <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(147,51,234,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    style={{ background: "linear-gradient(135deg, #9333ea, #7c3aed)" }}
                >
                    {submitting ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                    ) : (
                        <>
                            <Trophy size={18} />
                            Kirim Pendaftaran
                        </>
                    )}
                </motion.button>
            </motion.div>
        </motion.div>
    )
}
