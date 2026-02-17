"use client";

import { motion } from "framer-motion";
import { Crown, Trophy, Medal, Star } from "lucide-react";
import { useReveal } from "../hooks";
import { PLAYERS, RANK_COLORS } from "../data";

export default function HallOfFame() {
    const { ref, inView } = useReveal(0.1);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown size={15} color="#f59e0b" fill="#f59e0b" />;
        if (rank === 2) return <Medal size={15} color="#94a3b8" fill="#94a3b8" />;
        if (rank === 3) return <Medal size={15} color="#cd7c3e" fill="#cd7c3e" />;
        return null;
    };

    const getRankBg = (rank: number) => {
        if (rank === 1) return "rgba(245,158,11,0.12)";
        if (rank === 2) return "rgba(148,163,184,0.08)";
        if (rank === 3) return "rgba(205,124,62,0.1)";
        return "rgba(255,255,255,0.04)";
    };

    const getRankBorder = (rank: number) => {
        if (rank === 1) return "rgba(245,158,11,0.35)";
        if (rank === 2) return "rgba(148,163,184,0.25)";
        if (rank === 3) return "rgba(205,124,62,0.3)";
        return "rgba(255,255,255,0.07)";
    };

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
                    position: "absolute", top: "5%", right: "-8%",
                    width: "500px", height: "500px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }} />
                <div style={{
                    position: "absolute", bottom: "10%", left: "-8%",
                    width: "480px", height: "480px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
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
            </div>

            {/* ── Content ── */}
            <div
                ref={ref}
                style={{
                    position: "relative", zIndex: 1,
                    width: "100%", maxWidth: "900px",
                    padding: "5rem 1.5rem",
                }}
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ textAlign: "center", marginBottom: "3rem" }}
                >
                    {/* Icon badge */}
                    <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={inView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            width: "56px", height: "56px", borderRadius: "16px",
                            background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)",
                            marginBottom: "1.25rem",
                        }}
                    >
                        <Trophy size={26} color="#f59e0b" />
                    </motion.div>

                    {/* Label */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                        marginBottom: "0.75rem",
                    }}>
                        <div style={{ flex: 1, height: "1px", maxWidth: "80px", background: "linear-gradient(to right, transparent, rgba(245,158,11,0.3))" }} />
                        <span style={{
                            color: "#f59e0b", fontSize: "0.65rem", fontWeight: 700,
                            letterSpacing: "0.18em", textTransform: "uppercase",
                        }}>
                            PAPAN KEBANGGAAN
                        </span>
                        <div style={{ flex: 1, height: "1px", maxWidth: "80px", background: "linear-gradient(to left, transparent, rgba(245,158,11,0.3))" }} />
                    </div>

                    <h2 style={{
                        fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 900, color: "#fff",
                        letterSpacing: "-0.02em", marginBottom: "0.6rem", lineHeight: 1.15,
                    }}>
                        Hall of{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        }}>
                            Fame
                        </span>
                    </h2>
                    <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.6 }}>
                        Pemenang terbaru dari Kejuaraan September kami
                    </p>
                </motion.div>

                {/* Table card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.2 }}
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "20px", overflow: "hidden",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,158,11,0.05)",
                    }}
                >
                    {/* Table header */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "56px 1fr 1fr 110px",
                        padding: "0.9rem 1.5rem",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.02)",
                    }}>
                        {["#", "PEMAIN / TIM", "TURNAMEN", "HADIAH"].map((h, i) => (
                            <span key={h} style={{
                                color: "#4b5563", fontSize: "0.6rem", fontWeight: 700,
                                letterSpacing: "0.12em", textAlign: i === 3 ? "right" : "left",
                            }}>
                                {h}
                            </span>
                        ))}
                    </div>

                    {/* Rows */}
                    {PLAYERS.map((player, i) => (
                        <motion.div
                            key={player.rank}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.45, delay: 0.3 + i * 0.09 }}
                            whileHover={{
                                background: player.rank === 1
                                    ? "rgba(245,158,11,0.05)"
                                    : "rgba(139,92,246,0.05)",
                            }}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "56px 1fr 1fr 110px",
                                padding: "1rem 1.5rem",
                                borderBottom: i < PLAYERS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                                alignItems: "center",
                                cursor: "default",
                                transition: "background 0.2s",
                                background: player.rank === 1 ? "rgba(245,158,11,0.03)" : "transparent",
                            }}
                        >
                            {/* Rank */}
                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                <div style={{
                                    width: "28px", height: "28px", borderRadius: "8px",
                                    background: getRankBg(player.rank),
                                    border: `1px solid ${getRankBorder(player.rank)}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                    {getRankIcon(player.rank) ?? (
                                        <span style={{
                                            fontSize: "0.72rem", fontWeight: 800,
                                            color: RANK_COLORS[player.rank] ?? "#6b7280",
                                        }}>
                                            {player.rank}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Player */}
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <div style={{
                                    width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                                    background: player.color + "25",
                                    border: `1.5px solid ${player.color}55`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontWeight: 900, fontSize: "0.78rem", color: player.color,
                                }}>
                                    {player.initial}
                                </div>
                                <div>
                                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.2 }}>
                                        {player.name}
                                    </div>
                                    {player.rank === 1 && (
                                        <div style={{
                                            display: "inline-flex", alignItems: "center", gap: "0.25rem",
                                            marginTop: "0.2rem",
                                            background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)",
                                            borderRadius: "999px", padding: "0.1rem 0.45rem",
                                        }}>
                                            <Star size={9} color="#f59e0b" fill="#f59e0b" />
                                            <span style={{ color: "#f59e0b", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.08em" }}>
                                                JUARA
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tournament */}
                            <span style={{
                                color: "#6b7280", fontSize: "0.825rem",
                                fontStyle: "italic", overflow: "hidden",
                                textOverflow: "ellipsis", whiteSpace: "nowrap",
                                paddingRight: "0.5rem",
                            }}>
                                {player.tournament}
                            </span>

                            {/* Winnings */}
                            <div style={{ textAlign: "right" }}>
                                <span style={{
                                    color: player.rank === 1 ? "#f59e0b" : "#a78bfa",
                                    fontWeight: 800, fontSize: "0.9rem",
                                }}>
                                    {player.winnings}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.75, duration: 0.45 }}
                    style={{
                        textAlign: "center", marginTop: "2rem",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    }}
                >
                    <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }}
                    />
                    <span style={{ color: "#4b5563", fontSize: "0.75rem" }}>
                        Diperbarui setiap akhir bulan · <span style={{ color: "#6b7280" }}>September 2024</span>
                    </span>
                </motion.div>
            </div>
        </section>
    );
}