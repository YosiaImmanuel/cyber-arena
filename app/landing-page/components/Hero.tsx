"use client";

import { motion } from "framer-motion";
import { Radio, ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section style={{
            position: "relative", minHeight: "100vh",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", textAlign: "center",
            padding: "0 1.5rem", overflow: "hidden",
        }}>
            {/* BG gradient */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(109,40,217,0.18) 0%, transparent 70%)",
            }} />
            <div style={{
                position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
                width: "500px", height: "500px",
                background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
                filter: "blur(40px)", pointerEvents: "none",
            }} />
            {/* Grid */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
            }} />

            <div style={{ position: "relative", zIndex: 1, maxWidth: "640px" }}>
                {/* Live badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "0.4rem",
                        background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)",
                        borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "1.75rem",
                        fontSize: "0.75rem", fontWeight: 500, color: "#9d5cf6",
                    }}
                >
                    <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                        <Radio size={12} />
                    </motion.span>
                    MUSIM 4 TELAH TIBA
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{ fontSize: "clamp(2.4rem, 6vw, 3.75rem)", fontWeight: 800, lineHeight: 1.1, color: "#fff", letterSpacing: "-0.02em" }}
                >
                    Bergabunglah di
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: "clamp(2.4rem, 6vw, 3.75rem)", fontWeight: 800, lineHeight: 1.15,
                        marginBottom: "1.25rem", letterSpacing: "-0.02em",
                        background: "linear-gradient(135deg, #9d5cf6, #c084fc, #7c3aed)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}
                >
                    Arena Gaming Terbaik
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.65, maxWidth: "420px", margin: "0 auto 2.25rem" }}
                >
                    Bergabunglah dengan komunitas paling kompetitif, bertanding di turnamen global, dan raih peringkat legendaris.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}
                >
                    <motion.button
                        whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(124,58,237,0.5)" }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: "flex", alignItems: "center", gap: "0.4rem",
                            background: "var(--purple)", color: "#fff",
                            fontWeight: 600, fontSize: "0.9rem",
                            padding: "0.75rem 1.5rem", borderRadius: "8px",
                        }}
                    >
                        Daftar Sekarang <ArrowRight size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{ borderColor: "rgba(124,58,237,0.6)", color: "#fff" }}
                        style={{
                            background: "transparent", color: "var(--muted)",
                            fontWeight: 600, fontSize: "0.9rem",
                            padding: "0.75rem 1.5rem", borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s",
                        }}
                    >
                        Lihat Jadwal
                    </motion.button>
                </motion.div>
            </div>

            {/* Bottom fade */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
                background: "linear-gradient(to top, var(--bg), transparent)",
                pointerEvents: "none",
            }} />
        </section>
    );
}
