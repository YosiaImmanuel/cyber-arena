"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { createTeam } from "@/actions/team"
import { Users, FileText, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateTeamPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [nameFocused, setNameFocused] = useState(false)
    const [descFocused, setDescFocused] = useState(false)

    const handleSubmit = async () => {
        setError(null)
        if (!name.trim()) return setError("Nama tim tidak boleh kosong")

        setLoading(true)
        const formData = new FormData()
        formData.append("name", name.trim())
        formData.append("description", description.trim())

        const result = await createTeam(formData)
        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push("/home/team")
        }
    }

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
    const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-lg mx-auto space-y-6">
            {/* Header */}
            <motion.div variants={item}>
                <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-violet-400" />
                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Tim Baru</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white">Buat Tim</h1>
                <p className="text-gray-500 text-sm mt-1">Buat tim baru dan mulai rekrut anggota untuk berkompetisi.</p>
            </motion.div>

            {/* Form Card */}
            <motion.div
                variants={item}
                className="rounded-2xl p-6 space-y-5"
                style={{
                    background: "rgba(28,16,42,0.7)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                }}
            >
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

                {/* Nama Tim */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nama Tim</label>
                    <div
                        className="flex items-center gap-3 rounded-xl px-4 h-[52px] transition-all duration-200"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: `1px solid ${nameFocused ? "rgba(139,92,246,0.65)" : "rgba(255,255,255,0.1)"}`,
                            boxShadow: nameFocused ? "0 0 0 3px rgba(139,92,246,0.12)" : "none",
                        }}
                    >
                        <Users size={17} className={`shrink-0 transition-colors ${nameFocused ? "text-violet-400" : "text-gray-500"}`} />
                        <input
                            type="text"
                            placeholder="Masukkan nama tim"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setNameFocused(true)}
                            onBlur={() => setNameFocused(false)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-600"
                        />
                    </div>
                </div>

                {/* Deskripsi */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Deskripsi (opsional)</label>
                    <div
                        className="rounded-xl px-4 py-3 transition-all duration-200"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: `1px solid ${descFocused ? "rgba(139,92,246,0.65)" : "rgba(255,255,255,0.1)"}`,
                            boxShadow: descFocused ? "0 0 0 3px rgba(139,92,246,0.12)" : "none",
                        }}
                    >
                        <textarea
                            placeholder="Deskripsi singkat tentang tim kamu..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onFocus={() => setDescFocused(true)}
                            onBlur={() => setDescFocused(false)}
                            rows={3}
                            className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-600 resize-none"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <motion.button
                    whileHover={{ opacity: 0.9, boxShadow: "0 0 32px rgba(147,51,234,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full h-[52px] rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    style={{ background: "linear-gradient(135deg, #9333ea, #7c3aed)" }}
                >
                    {loading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                    ) : (
                        <>
                            Buat Tim
                            <ArrowRight size={18} />
                        </>
                    )}
                </motion.button>
            </motion.div>
        </motion.div>
    )
}
