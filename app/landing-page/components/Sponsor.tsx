"use client";

import { motion } from "framer-motion";
import { useReveal } from "../hooks";

const SPONSORS_TIER1 = [
  { name: "NVIDIA", category: "GPU & Teknologi", color: "#76b900", abbr: "NV" },
  { name: "Razer", category: "Periferal Gaming", color: "#00d4aa", abbr: "RZ" },
  { name: "Logitech G", category: "Periferal Gaming", color: "#0082d6", abbr: "LG" },
];

const SPONSORS_TIER2 = [
  { name: "Red Bull", category: "Minuman Energi", color: "#e8192c", abbr: "RB" },
  { name: "Garena", category: "Publisher Game", color: "#f97316", abbr: "GA" },
  { name: "ROG", category: "Hardware Gaming", color: "#ff0000", abbr: "RG" },
  { name: "HyperX", category: "Aksesoris Gaming", color: "#e31937", abbr: "HX" },
];

const INDUSTRIES = [
  { emoji: "🎮", label: "Publisher Game", count: "6 Mitra" },
  { emoji: "💻", label: "Hardware & PC", count: "8 Mitra" },
  { emoji: "🎧", label: "Periferal Gaming", count: "5 Mitra" },
  { emoji: "📺", label: "Media & Streaming", count: "4 Mitra" },
  { emoji: "⚡", label: "Minuman Energi", count: "3 Mitra" },
  { emoji: "📱", label: "Telekomunikasi", count: "4 Mitra" },
];

function LogoCard({ sponsor, delay }: { sponsor: { name: string; category: string; color: string; abbr: string }; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5, borderColor: sponsor.color + "55", boxShadow: `0 12px 40px ${sponsor.color}15` }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "1.5rem 1.25rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem",
        cursor: "default", transition: "all 0.3s",
        width: "100%",
      }}
    >
      {/* Logo placeholder */}
      <div style={{
        width: "56px", height: "56px", borderRadius: "14px",
        background: sponsor.color + "18",
        border: `1px solid ${sponsor.color}35`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: "0.85rem",
        color: sponsor.color,
        letterSpacing: "0.05em",
      }}>
        {sponsor.abbr}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.2rem" }}>
          {sponsor.name}
        </div>
        <div style={{ color: "#6b7280", fontSize: "0.65rem", letterSpacing: "0.06em" }}>
          {sponsor.category}
        </div>
      </div>
    </motion.div>
  );
}

export default function Sponsors() {
  const { ref, inView } = useReveal(0.1);

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
      {/* ── Background ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "10%", left: "-5%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "-5%",
          width: "450px", height: "450px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)",
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
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "1100px",
        padding: "5rem 1.5rem",
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
            marginBottom: "0.85rem",
          }}>
            <div style={{ flex: 1, height: "1px", maxWidth: "80px", background: "linear-gradient(to right, transparent, rgba(139,92,246,0.25))" }} />
            <span style={{ color: "#a78bfa", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em" }}>
              DIPERCAYA OLEH INDUSTRI
            </span>
            <div style={{ flex: 1, height: "1px", maxWidth: "80px", background: "linear-gradient(to left, transparent, rgba(139,92,246,0.25))" }} />
          </div>
          <h2 style={{
            fontSize: "clamp(1.7rem, 4vw, 2.75rem)", fontWeight: 900, color: "#fff",
            letterSpacing: "-0.02em", marginBottom: "0.6rem", lineHeight: 1.15,
          }}>
            Sponsor &{" "}
            <span style={{
              background: "linear-gradient(135deg, #c084fc, #a78bfa, #8b5cf6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Mitra Kami
            </span>
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto" }}>
            Didukung oleh brand-brand terkemuka di industri gaming global untuk memberikan pengalaman terbaik.
          </p>
        </motion.div>

        {/* Tier 1 — Sponsor Utama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1.25rem",
          }}>
            <div style={{ width: "22px", height: "2px", background: "#f59e0b", borderRadius: "2px" }} />
            <span style={{ color: "#f59e0b", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em" }}>
              SPONSOR UTAMA
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(245,158,11,0.12)" }} />
          </div>

          <style>{`
            .tier1-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
            .tier2-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
            .industry-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.85rem; }
            @media (max-width: 860px) {
              .tier1-grid { grid-template-columns: 1fr; gap: 0.85rem; }
              .tier2-grid { grid-template-columns: repeat(2, 1fr); }
              .industry-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 480px) {
              .tier1-grid { grid-template-columns: 1fr; gap: 0.75rem; }
              .tier2-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
              .industry-grid { grid-template-columns: repeat(2, 1fr); gap: 0.65rem; }
            }
          `}</style>

          <div className="tier1-grid">
            {SPONSORS_TIER1.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, borderColor: s.color + "60", boxShadow: `0 16px 50px ${s.color}15` }}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: "18px",
                  padding: "1.75rem 1.5rem",
                  display: "flex", alignItems: "center", gap: "1.25rem",
                  cursor: "default", transition: "all 0.3s",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Glow accent */}
                <div style={{
                  position: "absolute", top: "-20px", left: "-20px",
                  width: "80px", height: "80px", borderRadius: "50%",
                  background: s.color + "12", filter: "blur(20px)", pointerEvents: "none",
                }} />
                {/* Logo */}
                <div style={{
                  width: "64px", height: "64px", borderRadius: "16px", flexShrink: 0,
                  background: s.color + "15", border: `1.5px solid ${s.color}35`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1rem", color: s.color,
                  position: "relative", zIndex: 1,
                }}>
                  {s.abbr}
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", marginBottom: "0.25rem" }}>
                    {s.name}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.72rem", letterSpacing: "0.07em" }}>
                    {s.category}
                  </div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                    marginTop: "0.5rem",
                    background: s.color + "15", border: `1px solid ${s.color}30`,
                    borderRadius: "999px", padding: "0.15rem 0.5rem",
                  }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.color, display: "inline-block" }} />
                    <span style={{ color: s.color, fontSize: "0.6rem", fontWeight: 700 }}>SPONSOR UTAMA</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tier 2 — Mitra Pendukung */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{ marginBottom: "3rem" }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1.25rem",
          }}>
            <div style={{ width: "22px", height: "2px", background: "#8b5cf6", borderRadius: "2px" }} />
            <span style={{ color: "#a78bfa", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em" }}>
              MITRA PENDUKUNG
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(139,92,246,0.12)" }} />
          </div>

          <div className="tier2-grid">
            {SPONSORS_TIER2.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.45 }}
                whileHover={{ y: -4, borderColor: s.color + "45" }}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px",
                  padding: "1.1rem 1rem",
                  display: "flex", alignItems: "center", gap: "0.85rem",
                  cursor: "default", transition: "all 0.25s",
                }}
              >
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
                  background: s.color + "15", border: `1px solid ${s.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "0.7rem", color: s.color,
                }}>
                  {s.abbr}
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.15rem" }}>
                    {s.name}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.62rem" }}>{s.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1.25rem",
          }}>
            <div style={{ width: "22px", height: "2px", background: "#4b5563", borderRadius: "2px" }} />
            <span style={{ color: "#6b7280", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em" }}>
              INDUSTRI YANG TERLIBAT
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
          </div>

          <div className="industry-grid">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.58 + i * 0.06, duration: 0.4 }}
                whileHover={{ borderColor: "rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.05)" }}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px", padding: "0.9rem 1rem",
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  cursor: "default", transition: "all 0.25s",
                }}
              >
                <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{ind.emoji}</span>
                <div>
                  <div style={{ color: "#e5e7eb", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.1rem" }}>
                    {ind.label}
                  </div>
                  <div style={{ color: "#4b5563", fontSize: "0.62rem" }}>{ind.count}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.45 }}
          style={{
            textAlign: "center", marginTop: "3rem",
            padding: "1.5rem",
            background: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.15)",
            borderRadius: "16px",
          }}
        >
          <p style={{ color: "#9ca3af", fontSize: "0.85rem", marginBottom: "1rem" }}>
            Tertarik menjadi sponsor resmi Arena Pro?
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(139,92,246,0.35)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "linear-gradient(135deg, #9333ea, #7c3aed)",
              color: "#fff", fontWeight: 700, fontSize: "0.875rem",
              padding: "0.75rem 1.75rem", borderRadius: "10px",
              cursor: "pointer", transition: "box-shadow 0.25s",
            }}
          >
            Hubungi Tim Sponsorship →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}