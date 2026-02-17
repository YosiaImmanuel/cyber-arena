"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Trophy, Users, ArrowRight, Star, Shield, TrendingUp } from "lucide-react";

const STATS = [
  { icon: Users, value: "42K+", label: "Pemain Aktif" },
  { icon: Trophy, value: "$2.4M", label: "Total Hadiah" },
  { icon: TrendingUp, value: "14K+", label: "Tournament" },
];

const PERKS = [
  { icon: Trophy, text: "Hadiah hingga $10,000 per tournament" },
  { icon: Shield, text: "Sistem anti-cheat terpercaya" },
  { icon: Star, text: "Ranking & leaderboard real-time" },
  { icon: Zap, text: "Daftar gratis, langsung main" },
];

export default function JoinCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={ref}
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
      {/* ── Responsive styles ── */}
      <style>{`
        .joincta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          width: 100%;
          max-width: 1100px;
          padding: 4rem 3rem;
        }
        .joincta-right { display: flex; flex-direction: column; gap: 1.25rem; }
        .joincta-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
        .joincta-visual { height: 280px; }

        @media (max-width: 860px) {
          .joincta-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 4rem 1.5rem;
          }
          .joincta-stats { grid-template-columns: 1fr 1fr 1fr; }
          .joincta-visual { height: 200px; }
        }
        @media (max-width: 480px) {
          .joincta-grid { padding: 3.5rem 1.25rem; }
          .joincta-stats { gap: 0.65rem; }
          .joincta-visual { height: 170px; }
        }
      `}</style>

      {/* ── Background ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "10%", left: "-10%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "-10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(109,40,217,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
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

      {/* ── Main content ── */}
      <div className="joincta-grid" style={{ position: "relative", zIndex: 1 }}>

        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.45 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.45rem",
              background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.5rem",
            }}
          >
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <Zap size={13} color="#a78bfa" fill="#a78bfa" />
            </motion.div>
            <span style={{ color: "#a78bfa", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em" }}>
              GRATIS · MULAI SEKARANG
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 900, color: "#fff",
              lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "-0.02em",
            }}
          >
            Buktikan{" "}
            <span style={{
              background: "linear-gradient(135deg, #c084fc, #a78bfa, #8b5cf6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Kemampuanmu
            </span>
            <br />di Arena Terbesar.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.26, duration: 0.5 }}
            style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "440px" }}
          >
            Bergabung bersama <strong style={{ color: "#fff" }}>42,000+ pemain</strong> dari seluruh Indonesia. Ikut tournament, raih hadiah, dan buktikan bahwa kamu adalah yang terbaik.
          </motion.p>

          {/* Perks */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2.5rem" }}>
            {PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.32 + i * 0.08, duration: 0.4 }}
                  style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}
                >
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "7px", flexShrink: 0,
                    background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={13} color="#a78bfa" />
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem" }}>{perk.text}</span>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.68, duration: 0.45 }}
            style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}
          >
            <motion.button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(139,92,246,0.55)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                padding: "0.9rem 2rem", borderRadius: "12px",
                border: "none", cursor: "pointer", transition: "box-shadow 0.25s",
              }}
            >
              Daftar Gratis
              <motion.span animate={{ x: hovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
                <ArrowRight size={18} />
              </motion.span>
            </motion.button>

            <motion.button
              whileHover={{ borderColor: "rgba(139,92,246,0.5)", color: "#fff" }}
              style={{
                background: "transparent", color: "#9ca3af",
                fontWeight: 600, fontSize: "0.9rem",
                padding: "0.9rem 1.75rem", borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              Lihat Tournament
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.4 }}
            style={{ color: "#4b5563", fontSize: "0.75rem", marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
          >
            <span>✓ Gratis selamanya</span>
            <span>·</span>
            <span>✓ Tanpa kartu kredit</span>
            <span>·</span>
            <span>✓ Daftar 1 menit</span>
          </motion.p>
        </div>

        {/* RIGHT */}
        <div className="joincta-right">
          {/* Stats */}
          <div className="joincta-stats">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, borderColor: "rgba(139,92,246,0.4)" }}
                  style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px", padding: "1rem 0.75rem",
                    textAlign: "center", transition: "all 0.25s", cursor: "default",
                  }}
                >
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 0.65rem",
                  }}>
                    <Icon size={17} color="#a78bfa" />
                  </div>
                  <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#fff", marginBottom: "0.15rem", letterSpacing: "-0.03em" }}>
                    {stat.value}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.65rem", fontWeight: 500 }}>{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Visual card — tanpa live badge */}
          <motion.div
            className="joincta-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative", borderRadius: "20px", overflow: "hidden",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "url(https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80)",
              backgroundSize: "cover", backgroundPosition: "center",
              filter: "brightness(0.3) saturate(0.5)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(109,40,217,0.3) 0%, rgba(13,8,20,0.6) 100%)",
            }} />

            {/* Prize badge only */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", top: "1.25rem", right: "1.25rem",
                background: "rgba(245,158,11,0.15)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: "10px", padding: "0.55rem 0.9rem",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}
            >
              <Trophy size={14} color="#f59e0b" />
              <span style={{ color: "#f59e0b", fontSize: "0.75rem", fontWeight: 700 }}>$10,000</span>
            </motion.div>

            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem",
              background: "linear-gradient(to top, rgba(13,8,20,0.95), transparent)",
            }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "1rem", marginBottom: "0.2rem" }}>
                Valorant Open Series
              </div>
              <div style={{ color: "#9ca3af", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Users size={12} /> 128 Slot Tersisa
                <span style={{ color: "#ef4444", fontWeight: 600 }}>· Tutup 3 Hari Lagi</span>
              </div>
            </div>
          </motion.div>

          {/* Live status bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.75, duration: 0.4 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px", padding: "0.85rem 1.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }}
              />
              <span style={{ color: "#9ca3af", fontSize: "0.78rem", fontWeight: 500 }}>
                <strong style={{ color: "#fff" }}>100</strong> match sedang berjalan
              </span>
            </div>
            <span style={{ color: "#6b7280", fontSize: "0.72rem" }}>Server: Optimal ✓</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}