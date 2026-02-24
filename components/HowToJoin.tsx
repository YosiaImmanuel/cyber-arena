"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    UserPlus, Users, Trophy, ClipboardCheck, CalendarClock,
} from "lucide-react";

const STEPS = [
    {
        number: "01",
        title: "Buat Akun",
        desc: "Daftar akun baru dan login ke platform untuk memulai perjalananmu.",
        icon: UserPlus,
        details: ["Register akun baru", "Login ke platform"],
        accent: "#818cf8",
    },
    {
        number: "02",
        title: "Buat atau Gabung Tim",
        desc: "Bentuk tim sendiri dan undang teman, atau gabung ke tim yang sudah ada.",
        icon: Users,
        details: ["Buat tim sendiri", "Invite pemain lain", "Join tim yang ada"],
        accent: "#a78bfa",
    },
    {
        number: "03",
        title: "Pilih Turnamen",
        desc: "Jelajahi daftar turnamen yang tersedia dan temukan yang cocok untukmu.",
        icon: Trophy,
        details: ["Lihat list turnamen", "Cek detail & hadiah", "Cek slot tersisa"],
        accent: "#c084fc",
    },
    {
        number: "04",
        title: "Daftar Turnamen",
        desc: "Daftarkan timmu ke turnamen pilihan dan tunggu konfirmasi dari penyelenggara.",
        icon: ClipboardCheck,
        details: ["Klik tombol daftar", "Registrasi turnamen", "Tunggu konfirmasi"],
        accent: "#7c3aed",
    },
    {
        number: "05",
        title: "Ikuti Pertandingan",
        desc: "Pantau jadwal pertandingan, lihat bracket, dan bertanding sesuai waktu.",
        icon: CalendarClock,
        details: ["Cek jadwal main", "Lihat bracket", "Main sesuai waktu"],
        accent: "#6366f1",
    },
];

export default function HowToJoin() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section
            style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* Responsive styles */}
            <style>{`
                .htj-steps {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    position: relative;
                }
                .htj-step-row {
                    display: grid;
                    grid-template-columns: 56px 1fr;
                    gap: 1.5rem;
                    align-items: start;
                }
                .htj-step-card {
                    padding: 1.5rem;
                    border-radius: 16px;
                    position: relative;
                    transition: all 0.3s;
                }
                .htj-step-card:hover {
                    transform: translateY(-3px);
                }
                .htj-detail-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.85rem;
                }
                @media (max-width: 640px) {
                    .htj-step-row {
                        grid-template-columns: 40px 1fr;
                        gap: 1rem;
                    }
                    .htj-step-card {
                        padding: 1.15rem;
                    }
                }
            `}</style>

            <div
                ref={ref}
                style={{
                    position: "relative", zIndex: 1,
                    width: "100%", maxWidth: "720px",
                    padding: "5rem 1.5rem",
                }}
            >
                {/* ── Header (matching Hero style) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ textAlign: "center", marginBottom: "3.5rem" }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)",
                            fontWeight: 700, lineHeight: 1.13,
                            letterSpacing: "-0.025em", marginBottom: "1rem",
                            fontFamily: "'DM Sans', sans-serif",
                            background: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 40%, #7c3aed 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Cara Bergabung
                    </motion.h2>
                </motion.div>

                {/* ── Steps ── */}
                <div className="htj-steps">
                    {STEPS.map((step, i) => {
                        const Icon = step.icon;
                        const isLast = i === STEPS.length - 1;

                        return (
                            <motion.div
                                key={step.number}
                                className="htj-step-row"
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.35 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Left — number + connector line */}
                                <div style={{
                                    display: "flex", flexDirection: "column", alignItems: "center",
                                    paddingTop: "0.25rem",
                                }}>
                                    {/* Number circle */}
                                    <div style={{
                                        width: "48px", height: "48px", borderRadius: "14px",
                                        background: `${step.accent}18`,
                                        border: `1.5px solid ${step.accent}40`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0, position: "relative",
                                    }}>
                                        <span style={{
                                            fontSize: "0.85rem", fontWeight: 900,
                                            color: step.accent, letterSpacing: "-0.02em",
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}>
                                            {step.number}
                                        </span>
                                        {/* Glow */}
                                        <div style={{
                                            position: "absolute", inset: "-6px",
                                            borderRadius: "18px", pointerEvents: "none",
                                            background: `radial-gradient(circle, ${step.accent}15 0%, transparent 70%)`,
                                        }} />
                                    </div>
                                    {/* Connector line */}
                                    {!isLast && (
                                        <motion.div
                                            initial={{ scaleY: 0 }}
                                            animate={inView ? { scaleY: 1 } : {}}
                                            transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                                            style={{
                                                width: "2px", flex: 1, minHeight: "20px",
                                                background: `linear-gradient(to bottom, ${step.accent}40, ${STEPS[i + 1]?.accent}20)`,
                                                transformOrigin: "top",
                                                borderRadius: "2px",
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Right — card */}
                                <div
                                    className="htj-step-card"
                                    style={{
                                        background: "rgba(255,255,255,0.025)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        marginBottom: isLast ? 0 : "0.75rem",
                                    }}
                                >
                                    {/* Top accent line */}
                                    <div style={{
                                        position: "absolute", top: 0, left: "1rem", right: "1rem",
                                        height: "1.5px", borderRadius: "2px",
                                        background: `linear-gradient(90deg, ${step.accent}50, transparent)`,
                                    }} />

                                    {/* Icon + Title row */}
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: "0.75rem",
                                        marginBottom: "0.5rem",
                                    }}>
                                        <div style={{
                                            width: "32px", height: "32px", borderRadius: "9px",
                                            background: `${step.accent}15`,
                                            border: `1px solid ${step.accent}30`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            flexShrink: 0,
                                        }}>
                                            <Icon size={16} color={step.accent} />
                                        </div>
                                        <h3 style={{
                                            color: "#fff", fontWeight: 800, fontSize: "1.05rem",
                                            letterSpacing: "-0.01em",
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}>
                                            {step.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p style={{
                                        color: "rgba(255,255,255,0.45)", fontSize: "0.85rem",
                                        lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif",
                                    }}>
                                        {step.desc}
                                    </p>

                                    {/* Detail tags */}
                                    <div className="htj-detail-tags">
                                        {step.details.map((detail, j) => (
                                            <motion.span
                                                key={j}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                                transition={{ delay: 0.55 + i * 0.1 + j * 0.05, duration: 0.3 }}
                                                style={{
                                                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                                                    background: `${step.accent}10`,
                                                    border: `1px solid ${step.accent}25`,
                                                    borderRadius: "999px", padding: "0.25rem 0.7rem",
                                                    color: step.accent, fontSize: "0.7rem",
                                                    fontWeight: 600, letterSpacing: "0.02em",
                                                    fontFamily: "'DM Sans', sans-serif",
                                                }}
                                            >
                                                <span style={{
                                                    width: "4px", height: "4px", borderRadius: "50%",
                                                    background: step.accent, display: "inline-block",
                                                    opacity: 0.7,
                                                }} />
                                                {detail}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
