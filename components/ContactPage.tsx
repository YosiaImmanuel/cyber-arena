"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";

const FORMSPREE_URL = "https://formspree.io/f/mykdlyvk";
const CONTACT_EMAIL = "yosiaipk@gmail.com";

const TOPICS = [
    "Pertanyaan umum",
    "Masalah teknis",
    "Kerjasama / Partnership",
    "Lainnya",
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async () => {
        if (!message.trim()) return;

        setStatus("loading");
        try {
            const res = await fetch(FORMSPREE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                    name: name || "Anonim",
                    topic: selectedTopic || "Tidak dipilih",
                    message,
                    _replyto: CONTACT_EMAIL,
                }),
            });

            if (res.ok) {
                setStatus("success");
                setName("");
                setSelectedTopic("");
                setMessage("");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <>
            <style>{`
                .contact-input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    font-size: 0.925rem;
                    padding: 0.75rem 0;
                    outline: none;
                    transition: border-color 0.2s;
                    resize: none;
                    font-family: inherit;
                }
                .contact-input::placeholder { color: rgba(180,170,210,0.35); }
                .contact-input:focus { border-bottom-color: rgba(99,102,241,0.6); }

                .topic-chip {
                    padding: 0.35rem 0.85rem;
                    border-radius: 999px;
                    border: 1px solid rgba(255,255,255,0.08);
                    font-size: 0.78rem;
                    color: rgba(180,170,210,0.55);
                    cursor: pointer;
                    background: transparent;
                    transition: all 0.2s;
                    white-space: nowrap;
                    font-family: inherit;
                }
                .topic-chip:hover, .topic-chip.selected {
                    border-color: rgba(99,102,241,0.4);
                    color: #a5b4fc;
                    background: rgba(99,102,241,0.08);
                }
            `}</style>

            <section style={{
                minHeight: "100vh",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "8rem 1.5rem 5rem",
            }}>
                <div style={{ width: "100%", maxWidth: "560px" }}>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ marginBottom: "3rem" }}
                    >
                        <p style={{
                            fontSize: "0.72rem", fontWeight: 700,
                            letterSpacing: "0.12em", color: "#818cf8",
                            textTransform: "uppercase", marginBottom: "0.75rem",
                            display: "flex", alignItems: "center", gap: "0.5rem",
                        }}>
                            <MessageSquare size={12} />
                            Kontak
                        </p>
                        <h1 style={{
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            fontWeight: 700, color: "#fff",
                            letterSpacing: "-0.025em", lineHeight: 1.15,
                            marginBottom: "0.75rem",
                        }}>
                            Ada yang bisa kami bantu?
                        </h1>
                        <p style={{ color: "rgba(180,170,210,0.55)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                            Kirim pesan dan kami akan membalas secepatnya.
                        </p>
                    </motion.div>

                    {/* Success state */}
                    <AnimatePresence>
                        {status === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.75rem",
                                    padding: "1rem 1.25rem", borderRadius: "12px",
                                    background: "rgba(16,185,129,0.08)",
                                    border: "1px solid rgba(52,211,153,0.2)",
                                    marginBottom: "2rem",
                                }}
                            >
                                <CheckCircle2 size={16} color="#34d399" />
                                <div>
                                    <p style={{ color: "#34d399", fontSize: "0.875rem", fontWeight: 600 }}>Pesan terkirim!</p>
                                    <p style={{ color: "rgba(52,211,153,0.7)", fontSize: "0.78rem", marginTop: "0.1rem" }}>
                                        Kami akan membalas ke email kamu secepatnya.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {status === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.75rem",
                                    padding: "1rem 1.25rem", borderRadius: "12px",
                                    background: "rgba(239,68,68,0.06)",
                                    border: "1px solid rgba(239,68,68,0.18)",
                                    marginBottom: "2rem",
                                }}
                            >
                                <AlertCircle size={16} color="#f87171" />
                                <div>
                                    <p style={{ color: "#f87171", fontSize: "0.875rem", fontWeight: 600 }}>Gagal mengirim</p>
                                    <p style={{ color: "rgba(248,113,113,0.7)", fontSize: "0.78rem", marginTop: "0.1rem" }}>
                                        Coba lagi atau kirim langsung ke {CONTACT_EMAIL}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                    >
                        {/* Name */}
                        <div>
                            <label style={{
                                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
                                color: "rgba(180,170,210,0.45)", textTransform: "uppercase",
                                display: "block", marginBottom: "0.4rem",
                            }}>
                                Nama
                            </label>
                            <input
                                className="contact-input"
                                placeholder="Nama kamu"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        {/* Topic chips */}
                        <div>
                            <label style={{
                                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
                                color: "rgba(180,170,210,0.45)", textTransform: "uppercase",
                                display: "block", marginBottom: "0.75rem",
                            }}>
                                Topik
                            </label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {TOPICS.map(t => (
                                    <button
                                        key={t}
                                        className={`topic-chip${selectedTopic === t ? " selected" : ""}`}
                                        onClick={() => setSelectedTopic(selectedTopic === t ? "" : t)}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label style={{
                                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
                                color: "rgba(180,170,210,0.45)", textTransform: "uppercase",
                                display: "block", marginBottom: "0.4rem",
                            }}>
                                Pesan
                            </label>
                            <textarea
                                className="contact-input"
                                placeholder="Tulis pesanmu di sini..."
                                rows={4}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </div>

                        {/* Submit */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem" }}>
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.4rem",
                                    color: "rgba(180,170,210,0.35)", fontSize: "0.8rem",
                                    textDecoration: "none", transition: "color 0.2s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = "#818cf8"; }}
                                onMouseLeave={e => { e.currentTarget.style.color = "rgba(180,170,210,0.35)"; }}
                            >
                                <Mail size={13} />
                                {CONTACT_EMAIL}
                            </a>

                            <motion.button
                                onClick={handleSubmit}
                                disabled={status === "loading" || !message.trim()}
                                whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(99,102,241,0.4)" }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.5rem",
                                    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                    color: "#fff", fontWeight: 600, fontSize: "0.875rem",
                                    padding: "0.7rem 1.6rem", borderRadius: "999px",
                                    border: "1px solid rgba(99,102,241,0.35)", cursor: "pointer",
                                    boxShadow: "0 4px 16px rgba(79,70,229,0.3)",
                                    opacity: status === "loading" || !message.trim() ? 0.6 : 1,
                                    transition: "opacity 0.2s",
                                }}
                            >
                                {status === "loading" ? (
                                    <>
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                            style={{
                                                width: "14px", height: "14px", borderRadius: "50%",
                                                border: "2px solid rgba(255,255,255,0.3)",
                                                borderTopColor: "#fff", display: "inline-block",
                                            }}
                                        />
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <Send size={14} />
                                        Kirim Pesan
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}