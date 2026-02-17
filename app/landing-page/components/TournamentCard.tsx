"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar } from "lucide-react";
import { Tournament } from "../data";

interface TournamentCardProps {
    t: Tournament;
    index: number;
}

export default function TournamentCard({ t, index }: TournamentCardProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                flex: 1, minWidth: "260px",
                background: "var(--bg-card)",
                border: `1px solid ${hovered ? "rgba(124,58,237,0.35)" : "var(--border)"}`,
                borderRadius: "12px", overflow: "hidden", cursor: "pointer",
                transition: "border-color 0.25s",
            }}
        >
            {/* Image */}
            <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                <motion.img
                    src={t.image} alt={t.title}
                    animate={{ scale: hovered ? 1.06 : 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(0.7)" }}
                />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(17,17,24,1) 0%, rgba(17,17,24,0.2) 60%, transparent 100%)",
                }} />
                {/* Badge */}
                <div style={{
                    position: "absolute", top: "0.75rem", left: "0.75rem",
                    background: t.badgeBg, border: `1px solid ${t.badgeColor}50`,
                    borderRadius: "6px", padding: "0.2rem 0.55rem",
                    display: "flex", alignItems: "center", gap: "0.3rem",
                }}>
                    {t.isLive && (
                        <motion.span
                            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                            style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff", display: "inline-block" }}
                        />
                    )}
                    <span style={{ color: t.badgeColor, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em" }}>
                        {t.badge}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: "1rem 1.1rem 1.2rem" }}>
                <div style={{ color: t.tagColor, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
                    {t.tag}
                </div>
                <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 700, marginBottom: "0.85rem", lineHeight: 1.3 }}>
                    {t.title}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "var(--muted)", fontSize: "0.8rem" }}>
                        <Trophy size={13} color="#9d5cf6" /> {t.prize}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "var(--muted)", fontSize: "0.8rem" }}>
                        <Calendar size={13} color="#9d5cf6" /> {t.date}
                    </div>
                </div>
                <motion.button
                    whileHover={{ background: "rgba(124,58,237,0.15)" }}
                    style={{
                        width: "100%", background: "var(--bg-card2)", color: "#fff",
                        fontWeight: 600, fontSize: "0.85rem", padding: "0.6rem",
                        borderRadius: "8px", border: "1px solid var(--border)", transition: "background 0.2s",
                    }}
                >
                    {t.ctaLabel}
                </motion.button>
            </div>
        </motion.div>
    );
}
