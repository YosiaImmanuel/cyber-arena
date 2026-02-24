"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();
    return (
        <section style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "10rem 1.5rem 5rem",
            overflow: "hidden",
        }}>

            <div style={{ position: "relative", zIndex: 1, maxWidth: "680px" }}>

                {/* ── ReactBits-style announcement pill ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0,
                        marginBottom: "2rem",
                        borderRadius: "999px",
                        overflow: "hidden",
                        border: "1px solid rgba(139,92,246,0.25)",
                        boxShadow: "0 2px 16px rgba(109,40,217,0.2)",
                        cursor: "pointer",
                    }}
                    onClick={() => router.push("/auth/sign-up")}
                >
                    {/* Left badge */}
                    <span style={{
                        background: "linear-gradient(135deg, #5b21b6, #7c3aed)",
                        color: "#fff",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        padding: "0.35rem 0.85rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                    }}>
                        <Sparkles size={11} fill="#fff" />
                        MUSIM 4
                    </span>
                    {/* Right label */}
                    <span style={{
                        background: "rgba(15,10,30,0.85)",
                        backdropFilter: "blur(12px)",
                        color: "rgba(200,185,255,0.85)",
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        padding: "0.35rem 0.9rem 0.35rem 0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                    }}>
                        Telah Tiba
                        <ArrowRight size={11} style={{ opacity: 0.6 }} />
                    </span>
                </motion.div>

                {/* ── Headline ── */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: "clamp(2.2rem, 5.5vw, 3.5rem)",
                        fontWeight: 700,
                        lineHeight: 1.13,
                        color: "#fff",
                        letterSpacing: "-0.025em",
                        marginBottom: "0.2rem",
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >
                    Website Tournament Online Terbaik
                </motion.h1>

                {/* ── Subtitle ── */}
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.38 }}
                    style={{
                        color: "rgba(180,170,210,0.65)",
                        fontSize: "0.975rem",
                        lineHeight: 1.7,
                        maxWidth: "400px",
                        margin: "0 auto 2.5rem",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 400,
                    }}
                >
                    Daftar tim, ikuti turnamen, dan pantau bracket, semua terstruktur dan real-time.                </motion.p>

                {/* ── Single CTA Button (ReactBits style) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.46 }}
                >
                    <motion.button
                        onClick={() => router.push("/auth/sign-up")}
                        whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(124,58,237,0.55)" }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                            color: "#fff",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            padding: "0.85rem 2.2rem",
                            borderRadius: "999px",
                            border: "1px solid rgba(99,102,241,0.35)",
                            cursor: "pointer",
                            boxShadow: "0 4px 16px rgba(79,70,229,0.35)",
                            letterSpacing: "0.01em",
                        }}
                    >
                        Daftar Sekarang
                    </motion.button>
                </motion.div>
            </div>

        </section>
    );
}