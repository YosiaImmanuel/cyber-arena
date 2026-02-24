"use client";

import { inView, motion } from "framer-motion";
import { Users, Trophy, Calendar, Search, User, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const FEATURES = [
    {
        icon: Users,
        title: "Manajemen Tim",
        copy: "Kelola timmu dengan mudah dan siapkan strategi terbaik untuk setiap pertandingan.",
        points: ["Buat tim sendiri", "Invite member via pencarian", "Kelola daftar anggota", "Atur strategi tim"],
        color: "#6366f1",
        glow: "rgba(99,102,241,0.18)",
    },
    {
        icon: Trophy,
        title: "Sistem Pendaftaran",
        copy: "Daftar turnamen favoritmu hanya dalam beberapa langkah sederhana.",
        points: ["List turnamen aktif", "Detail jadwal & hadiah", "Daftar dengan 1 klik", "Status pendaftaran real-time"],
        color: "#f59e0b",
        glow: "rgba(245,158,11,0.15)",
    },
    {
        icon: Calendar,
        title: "Jadwal & Bracket",
        copy: "Pantau jadwal dan posisi timmu secara real-time.",
        points: ["Lihat jadwal pertandingan", "Info waktu & lawan", "Tampilan bracket", "Notifikasi jadwal"],
        color: "#10b981",
        glow: "rgba(16,185,129,0.15)",
    },
    {
        icon: Search,
        title: "Pencarian Pemain",
        copy: "Bangun tim impianmu dengan sistem pencarian pemain yang cepat.",
        points: ["Cari via username", "Kirim undangan tim", "Terima / tolak invite", "Filter berdasarkan skill"],
        color: "#8b5cf6",
        glow: "rgba(139,92,246,0.18)",
    },
    {
        icon: User,
        title: "Profil User",
        copy: "Tampilkan perjalanan kompetitifmu dalam satu profil profesional.",
        points: ["Statistik turnamen", "Riwayat pertandingan", "Tim yang diikuti", "Pencapaian & badge"],
        color: "#06b6d4",
        glow: "rgba(6,182,212,0.15)",
    },
    {
        icon: Zap,
        title: "Real-time Experience",
        copy: "Semua data ter-update secara instan tanpa perlu refresh halaman.",
        points: ["Update status otomatis", "Pendaftaran instan", "Sinkronisasi real-time", "Powered by Supabase"],
        color: "#f43f5e",
        glow: "rgba(244,63,94,0.15)",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function Features() {
    const router = useRouter();

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.25rem;
                }

                .feature-card {
                    position: relative;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    padding: 1.75rem;
                    cursor: default;
                    overflow: hidden;
                    transition: border-color 0.3s, transform 0.3s;
                }

                .feature-card:hover {
                    transform: translateY(-4px);
                }

                .feature-point {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(200,210,255,0.5);
                    font-size: 0.82rem;
                    font-family: 'DM Sans', sans-serif;
                    line-height: 1.5;
                }

                .feature-point::before {
                    content: '';
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: currentColor;
                    flex-shrink: 0;
                    opacity: 0.6;
                }

                @media (max-width: 1024px) {
                    .features-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 600px) {
                    .features-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <section style={{
                position: "relative",
                padding: "6rem 1.5rem",
                maxWidth: "1200px",
                margin: "0 auto",
            }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
                        Fitur Lengkap
                    </motion.h2>
                </motion.div>

                {/* Feature Cards Grid */}
                <div className="features-grid">
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                className="feature-card"
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                                variants={cardVariants}
                                whileHover={{ borderColor: `${feature.color}40` }}
                                style={{ fontFamily: "sans-serif" }}
                            >
                                {/* Hover glow overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        position: "absolute", inset: 0,
                                        background: `radial-gradient(ellipse 80% 60% at 20% 20%, ${feature.glow} 0%, transparent 70%)`,
                                        pointerEvents: "none", borderRadius: "16px",
                                    }}
                                />

                                {/* Icon */}
                                <div style={{
                                    width: "44px", height: "44px",
                                    background: `${feature.color}18`,
                                    border: `1px solid ${feature.color}30`,
                                    borderRadius: "12px",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    marginBottom: "1.2rem",
                                    position: "relative", zIndex: 1,
                                }}>
                                    <Icon size={20} color={feature.color} strokeWidth={1.8} />
                                </div>

                                {/* Title */}
                                <h3 style={{
                                    fontFamily: "sans-serif",
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    color: "#fff",
                                    marginBottom: "0.5rem",
                                    letterSpacing: "-0.01em",
                                    position: "relative", zIndex: 1,
                                }}>
                                    {feature.title}
                                </h3>

                                {/* Copy */}
                                <p style={{
                                    color: "rgba(180,170,210,0.6)",
                                    fontSize: "0.845rem",
                                    lineHeight: 1.65,
                                    marginBottom: "1.25rem",
                                    position: "relative", zIndex: 1,
                                }}>
                                    {feature.copy}
                                </p>

                                {/* Divider */}
                                <div style={{
                                    height: "1px",
                                    background: "rgba(255,255,255,0.06)",
                                    marginBottom: "1rem",
                                    position: "relative", zIndex: 1,
                                }} />

                                {/* Points */}
                                <ul style={{
                                    listStyle: "none", padding: 0, margin: 0,
                                    display: "flex", flexDirection: "column", gap: "0.45rem",
                                    position: "relative", zIndex: 1,
                                }}>
                                    {feature.points.map((point) => (
                                        <li key={point} className="feature-point" style={{ color: "rgba(200,210,255,0.5)" }}>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ textAlign: "center", marginTop: "3rem" }}
                >
                </motion.div>
            </section>
        </>
    );
}