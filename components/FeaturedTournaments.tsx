"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/hooks"; 
import { TOURNAMENTS } from "@/app/landing-page/data"; 
import TournamentCard from "./TournamentCard";

export default function FeaturedTournaments() {
    const { ref, inView } = useReveal(0.1);

    return (
        <section
            style={{
                position: "relative",
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background: "linear-gradient(135deg, #05030d 0%, #080514 50%, #05030d 100%)",
            }}
        >
            {/* ── Background ── */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{
                    position: "absolute", top: "-5%", left: "-10%",
                    width: "550px", height: "550px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }} />
                <div style={{
                    position: "absolute", bottom: "0%", right: "-8%",
                    width: "480px", height: "480px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(109,40,217,0.1) 0%, transparent 70%)",
                    filter: "blur(55px)",
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 100%)",
                }} />
                {[25, 50, 75].map((pos) => (
                    <div key={pos} style={{
                        position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: "1px",
                        background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.07), transparent)",
                    }} />
                ))}
                {[33, 66].map((pos) => (
                    <div key={pos} style={{
                        position: "absolute", left: 0, right: 0, top: `${pos}%`, height: "1px",
                        background: "linear-gradient(to right, transparent, rgba(139,92,246,0.06), transparent)",
                    }} />
                ))}
            </div>

            {/* ── Responsive styles ── */}
            <style>{`
                .tournament-grid {
                    display: grid;
                    gap: 1.25rem;
                    grid-template-columns: repeat(3, 1fr);
                }
                .t-card-img { height: 160px; }

                @media (max-width: 900px) {
                    .tournament-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 580px) {
                    .tournament-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                    .t-card-img { height: 120px; }
                }
            `}</style>

            {/* ── Content ── */}
            <div
                ref={ref}
                style={{
                    position: "relative", zIndex: 1,
                    width: "100%", maxWidth: "1100px",
                    padding: "5rem 1.25rem",
                }}
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginBottom: "2.5rem" }}
                >
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        marginBottom: "0.75rem",
                    }}>
                        <div style={{ width: "28px", height: "2px", background: "#8b5cf6", borderRadius: "2px" }} />
                        <span style={{
                            color: "#a78bfa", fontSize: "0.72rem", fontWeight: 700,
                            letterSpacing: "0.12em", textTransform: "uppercase",
                        }}>
                            Pilih Turnamenmu
                        </span>
                    </div>

                    <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "flex-end", flexWrap: "wrap", gap: "0.75rem",
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
                                fontWeight: 900, color: "#fff",
                                marginBottom: "0.4rem", lineHeight: 1.15,
                                letterSpacing: "-0.02em",
                            }}>
                                Turnamen{" "}
                                <span style={{
                                    background: "linear-gradient(135deg, #c084fc, #a78bfa, #8b5cf6)",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                }}>
                                    Unggulan
                                </span>
                            </h2>
                            <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.6 }}>
                                Ayo beraksi dan menangkan hadiah besar setiap minggunya.
                            </p>
                        </div>

                        <motion.a
                            href="#"
                            whileHover={{ x: 3, color: "#fff" }}
                            style={{
                                display: "flex", alignItems: "center", gap: "0.35rem",
                                color: "#a78bfa", fontSize: "0.85rem",
                                fontWeight: 600, whiteSpace: "nowrap",
                                transition: "color 0.2s",
                            }}
                        >
                            Lihat semua <ArrowRight size={14} />
                        </motion.a>
                    </div>
                </motion.div>

                {/* Cards */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="tournament-grid"
                >
                    {TOURNAMENTS.map((t, i) => (
                        <TournamentCard key={i} t={t} index={i} />
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.55, duration: 0.5 }}
                    style={{
                        marginTop: "3rem",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", gap: "1rem", flexWrap: "wrap",
                    }}
                >
                    <div style={{
                        height: "1px", flex: 1, maxWidth: "200px",
                        background: "linear-gradient(to right, transparent, rgba(139,92,246,0.25))",
                    }} />
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "0.5rem",
                            background: "rgba(139,92,246,0.12)",
                            border: "1px solid rgba(139,92,246,0.3)",
                            color: "#a78bfa", fontWeight: 600, fontSize: "0.875rem",
                            padding: "0.7rem 1.5rem", borderRadius: "10px",
                            cursor: "pointer", transition: "box-shadow 0.25s",
                        }}
                    >
                        Lihat Semua Turnamen <ArrowRight size={15} />
                    </motion.a>
                    <div style={{
                        height: "1px", flex: 1, maxWidth: "200px",
                        background: "linear-gradient(to left, transparent, rgba(139,92,246,0.25))",
                    }} />
                </motion.div>
            </div>
        </section>
    );
}