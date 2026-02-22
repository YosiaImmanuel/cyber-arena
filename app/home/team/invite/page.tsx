"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { searchUsers, inviteUser, getMyTeam } from "@/actions/team"
import {
    Search, UserPlus, AlertCircle, CheckCircle2,
    ArrowLeft, Users, Loader2
} from "lucide-react"
import Link from "next/link"

export default function InvitePage() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [searching, setSearching] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)
    const [teamId, setTeamId] = useState<string | null>(null)
    const [inviting, setInviting] = useState<string | null>(null)
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)
    const [invitedUsers, setInvitedUsers] = useState<Set<string>>(new Set())

    useEffect(() => {
        async function load() {
            const team = await getMyTeam()
            if (team) setTeamId(team.id)
        }
        load()
    }, [])

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length < 2) {
                setResults([])
                return
            }
            setSearching(true)
            const data = await searchUsers(query.trim())
            setResults(data)
            setSearching(false)
        }, 400)

        return () => clearTimeout(timer)
    }, [query])

    const handleInvite = async (userId: string) => {
        if (!teamId) return
        setInviting(userId)
        setFeedback(null)

        const result = await inviteUser(teamId, userId)
        if (result.error) {
            setFeedback({ type: "error", message: result.error })
        } else {
            setFeedback({ type: "success", message: "Undangan berhasil dikirim!" })
            setInvitedUsers(prev => new Set(prev).add(userId))
        }
        setInviting(null)
    }

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
    const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-lg mx-auto space-y-6">
            {/* Header */}
            <motion.div variants={item}>
                <Link
                    href="/home/team"
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-violet-400 transition-colors mb-4"
                >
                    <ArrowLeft size={14} />
                    Kembali ke Tim
                </Link>
                <div className="flex items-center gap-2 mb-2">
                    <UserPlus size={16} className="text-violet-400" />
                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Undang</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white">Cari & Undang Player</h1>
                <p className="text-gray-500 text-sm mt-1">Cari player berdasarkan username lalu kirim undangan.</p>
            </motion.div>

            {/* Feedback */}
            {feedback && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl text-sm"
                    style={{
                        background: feedback.type === "error" ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
                        border: `1px solid ${feedback.type === "error" ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`,
                    }}
                >
                    {feedback.type === "error"
                        ? <AlertCircle size={16} className="text-red-400 shrink-0" />
                        : <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    }
                    <span className={feedback.type === "error" ? "text-red-400" : "text-emerald-400"}>
                        {feedback.message}
                    </span>
                </motion.div>
            )}

            {/* Search */}
            <motion.div variants={item}>
                <div
                    className="flex items-center gap-3 rounded-xl px-4 h-[52px] transition-all duration-200"
                    style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${searchFocused ? "rgba(139,92,246,0.65)" : "rgba(255,255,255,0.1)"}`,
                        boxShadow: searchFocused ? "0 0 0 3px rgba(139,92,246,0.12)" : "none",
                    }}
                >
                    <Search size={17} className={`shrink-0 transition-colors ${searchFocused ? "text-violet-400" : "text-gray-500"}`} />
                    <input
                        type="text"
                        placeholder="Ketik username minimal 2 huruf..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-600"
                    />
                    {searching && (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 size={16} className="text-violet-400" />
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Results */}
            <motion.div variants={item} className="space-y-2">
                {results.length > 0 && (
                    <p className="text-xs text-gray-500 mb-2">{results.length} user ditemukan</p>
                )}
                {results.map((user) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl p-4 flex items-center justify-between"
                        style={{
                            background: "rgba(28,16,42,0.6)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center text-sm font-bold text-white">
                                {user.username?.[0]?.toUpperCase() || "?"}
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">{user.username}</p>
                                {user.full_name && (
                                    <p className="text-gray-500 text-xs">{user.full_name}</p>
                                )}
                            </div>
                        </div>

                        {invitedUsers.has(user.id) ? (
                            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                                <CheckCircle2 size={13} className="inline mr-1" />
                                Terkirim
                            </span>
                        ) : (
                            <button
                                onClick={() => handleInvite(user.id)}
                                disabled={inviting === user.id || !teamId}
                                className="px-3 py-1.5 rounded-lg bg-violet-500/15 text-violet-400 text-xs font-semibold hover:bg-violet-500/25 transition-colors cursor-pointer disabled:opacity-50"
                            >
                                {inviting === user.id ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                        className="w-3.5 h-3.5 border-2 border-violet-400/30 border-t-violet-400 rounded-full inline-block"
                                    />
                                ) : (
                                    <>
                                        <UserPlus size={13} className="inline mr-1" />
                                        Undang
                                    </>
                                )}
                            </button>
                        )}
                    </motion.div>
                ))}

                {query.trim().length >= 2 && !searching && results.length === 0 && (
                    <div className="text-center py-12">
                        <Users size={32} className="text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">Tidak ada user ditemukan untuk &quot;{query}&quot;</p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}
