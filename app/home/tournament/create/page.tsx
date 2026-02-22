"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { createTournament } from "@/actions/tournament"
import { Trophy, Calendar, DollarSign, FileText, ArrowLeft, Loader2, Image } from "lucide-react"
import Link from "next/link"

const GAME_CATEGORIES = [
    "Mobile Legends", "Free Fire", "PUBG Mobile",
    "CODM", "HOK", "CS GO", "Valorant", "DOTA 2", "League of Legends"
]

export default function CreateTournamentPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState({
        name: "",
        game_category: "",
        description: "",
        prize_pool: "",
        max_slots: "8",
        google_form_url: "",
        banner_url: "",
        registration_start: "",
        registration_end: "",
        tournament_start: "",
        tournament_end: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const result = await createTournament({
            name: form.name,
            game_category: form.game_category,
            description: form.description || undefined,
            prize_pool: form.prize_pool || undefined,
            max_slots: parseInt(form.max_slots),
            google_form_url: form.google_form_url,
            banner_url: form.banner_url || undefined,
            registration_start: form.registration_start || undefined,
            registration_end: form.registration_end || undefined,
            tournament_start: form.tournament_start || undefined,
            tournament_end: form.tournament_end || undefined,
        })

        if (result.error) {
            setError(result.error)
            setLoading(false)
            return
        }

        router.push("/home/tournament")
        router.refresh()
    }

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
    const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
    const inputClass = "w-full px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto space-y-6">

            {/* Header */}
            <motion.div variants={item}>
                <Link href="/home/tournament" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-violet-400 transition-colors mb-4">
                    <ArrowLeft size={13} />
                    Kembali ke daftar tournament
                </Link>
                <div className="flex items-center gap-2 mb-1">
                    <Trophy size={16} className="text-violet-400" />
                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Tournament</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white">Buat Tournament</h1>
                <p className="text-gray-500 text-sm mt-1">Isi detail tournament yang ingin kamu adakan.</p>
            </motion.div>

            <motion.form variants={item} onSubmit={handleSubmit} className="space-y-4">

                {/* Informasi Dasar */}
                <div className="rounded-xl p-5 space-y-4" style={{ background: "rgba(28,16,42,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                        <FileText size={14} className="text-violet-400" /> Informasi Dasar
                    </h2>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Nama Tournament *</label>
                        <input
                            name="name" value={form.name} onChange={handleChange} required
                            placeholder="Contoh: ArenaHub Cup Season 1"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Game *</label>
                        <select
                            name="game_category" value={form.game_category} onChange={handleChange} required
                            className={`${inputClass} appearance-none cursor-pointer`}
                        >
                            <option value="" disabled className="bg-[#1c102a]">Pilih game...</option>
                            {GAME_CATEGORIES.map(g => (
                                <option key={g} value={g} className="bg-[#1c102a]">{g}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Deskripsi</label>
                        <textarea
                            name="description" value={form.description} onChange={handleChange}
                            rows={3} placeholder="Aturan, format, atau info tambahan..."
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Link Google Form *</label>
                        <input
                            name="google_form_url" value={form.google_form_url} onChange={handleChange} required
                            placeholder="https://forms.gle/..."
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Banner */}
                <div className="rounded-xl p-5 space-y-4" style={{ background: "rgba(28,16,42,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                        <Image size={14} className="text-sky-400" /> Banner
                    </h2>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">URL Banner</label>
                        <input
                            name="banner_url" value={form.banner_url} onChange={handleChange}
                            placeholder="https://i.imgur.com/..."
                            className={inputClass}
                        />
                        <p className="text-[11px] text-gray-600 mt-1.5">Masukkan URL gambar banner tournament. Kosongkan jika tidak ada.</p>
                    </div>

                    {/* Preview */}
                    {form.banner_url && (
                        <div className="rounded-xl overflow-hidden h-36 relative">
                            <Image
                                src={form.banner_url}
                                alt="Banner preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none"
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0916]/60 to-transparent" />
                            <span className="absolute bottom-2 left-3 text-[10px] text-gray-400">Preview</span>
                        </div>
                    )}
                </div>

                {/* Hadiah & Slot */}
                <div className="rounded-xl p-5 space-y-4" style={{ background: "rgba(28,16,42,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                        <DollarSign size={14} className="text-emerald-400" /> Hadiah & Slot
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5">Prize Pool</label>
                            <input
                                name="prize_pool" value={form.prize_pool} onChange={handleChange}
                                placeholder="Contoh: Rp 500.000"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5">Maks. Slot Tim *</label>
                            <input
                                name="max_slots" type="number" min="2" max="256"
                                value={form.max_slots} onChange={handleChange} required
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>

                {/* Jadwal */}
                <div className="rounded-xl p-5 space-y-4" style={{ background: "rgba(28,16,42,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                        <Calendar size={14} className="text-amber-400" /> Jadwal
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5">Mulai Pendaftaran</label>
                            <input
                                name="registration_start" type="date"
                                value={form.registration_start} onChange={handleChange}
                                className={`${inputClass} [color-scheme:dark]`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5">Batas Pendaftaran</label>
                            <input
                                name="registration_end" type="date"
                                value={form.registration_end} onChange={handleChange}
                                className={`${inputClass} [color-scheme:dark]`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5">Mulai Tournament</label>
                            <input
                                name="tournament_start" type="date"
                                value={form.tournament_start} onChange={handleChange}
                                className={`${inputClass} [color-scheme:dark]`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5">Selesai Tournament</label>
                            <input
                                name="tournament_end" type="date"
                                value={form.tournament_end} onChange={handleChange}
                                className={`${inputClass} [color-scheme:dark]`}
                            />
                        </div>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Submit */}
                <div className="flex gap-3 pb-6">
                    <button
                        type="submit" disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all shadow-lg shadow-violet-900/40"
                    >
                        {loading ? <Loader2 size={14} className="animate-spin" /> : <Trophy size={14} />}
                        {loading ? "Membuat..." : "Buat Tournament"}
                    </button>
                    <Link href="/home/tournament">
                        <button type="button" className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 border border-white/[0.08] hover:bg-white/[0.05] transition-all">
                            Batal
                        </button>
                    </Link>
                </div>

            </motion.form>
        </motion.div>
    )
}