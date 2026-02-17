"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Smartphone, ArrowRight, Gamepad2 } from "lucide-react";

/* ── Data ── */
const CATEGORIES = [
  {
    id: "pc",
    label: "PC Games",
    desc: "Valorant, CS:GO, Dota 2, dan lainnya.",
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1542315204-b8d9d0a4b2d9?w=700&q=80",
    accent: "#8b5cf6",
    count: "8 Tournament Aktif",
  },
  {
    id: "mobile",
    label: "Mobile Games",
    desc: "MLBB, PUBG Mobile, Free Fire, dan lainnya.",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=700&q=80",
    accent: "#7c3aed",
    count: "12 Tournament Aktif",
  },
];

const TICKER_ROW_1 = [
  "FREE FIRE", "WILD RIFT", "COD MOBILE", "APEX LEGENDS", "DOTA 2", "CS:GO",
  "FREE FIRE", "WILD RIFT", "COD MOBILE", "APEX LEGENDS", "DOTA 2", "CS:GO",
];

const TICKER_ROW_2 = [
  "VALVE", "GARENA", "UBISOFT", "ACTIVISION", "RIOT GAMES", "BLIZZARD",
  "VALVE", "GARENA", "UBISOFT", "ACTIVISION", "RIOT GAMES", "BLIZZARD",
];

/* ── Marquee Row ── */
function MarqueeRow({
  items,
  direction = "left",
  speed = 35,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const animX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <motion.div
        animate={{ x: animX }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", alignItems: "center", width: "max-content" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.15)",
                fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0 2.5rem",
                whiteSpace: "nowrap",
                fontStyle: "italic",
              }}
            >
              {item}
            </span>
            <span
              style={{
                width: "4px", height: "4px", borderRadius: "50%",
                background: "rgba(139,92,246,0.35)", flexShrink: 0,
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Main Component ── */
export default function GameCategory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [hovered, setHovered] = useState<string | null>(null);

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
          position: "absolute", top: "15%", right: "-5%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-8%",
          width: "450px", height: "450px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(109,40,217,0.1) 0%, transparent 70%)",
          filter: "blur(55px)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
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

      {/* ── Content wrapper ── */}
      <div
        ref={ref}
        style={{
          position: "relative", zIndex: 1,
          width: "100%", padding: "5rem 0",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Top ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: "1.5rem" }}
        >
          <div style={{
            textAlign: "center", marginBottom: "0.85rem",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
          }}>
            <div style={{
              flex: 1, height: "1px", maxWidth: "120px", marginLeft: "auto",
              background: "linear-gradient(to right, transparent, rgba(139,92,246,0.2))",
            }} />
            <span style={{
              color: "rgba(139,92,246,0.5)", fontSize: "0.62rem",
              fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            }}>
              GAME POPULER
            </span>
            <div style={{
              flex: 1, height: "1px", maxWidth: "120px", marginRight: "auto",
              background: "linear-gradient(to left, transparent, rgba(139,92,246,0.2))",
            }} />
          </div>
          <MarqueeRow items={TICKER_ROW_1} direction="left" speed={40} />
        </motion.div>

        {/* Cards area */}
        <div style={{
          maxWidth: "1000px", width: "100%",
          margin: "0 auto", padding: "2rem 2rem",
        }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center", marginBottom: "2.5rem" }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.45rem",
              background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)",
              borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "1rem",
            }}>
              <Gamepad2 size={13} color="#a78bfa" />
              <span style={{ color: "#a78bfa", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                PILIH PLATFORMMU
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 900, color: "#fff",
              lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "0.5rem",
            }}>
              Kategori{" "}
              <span style={{
                background: "linear-gradient(135deg, #c084fc, #a78bfa, #8b5cf6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Game
              </span>
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Pilih platform favoritmu dan mulai bertanding sekarang.
            </p>
          </motion.div>

          {/* Responsive grid */}
          <style>{`
            .cat-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1.25rem;
            }
            @media (max-width: 600px) {
              .cat-grid { grid-template-columns: 1fr; }
              .cat-card { height: 170px !important; }
            }
          `}</style>

          <div className="cat-grid">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const isHovered = hovered === cat.id;

              return (
                <motion.div
                  key={cat.id}
                  className="cat-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHovered(cat.id)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -6 }}
                  style={{
                    position: "relative",
                    borderRadius: "18px", overflow: "hidden",
                    height: "260px", cursor: "pointer",
                    border: `1px solid ${isHovered ? cat.accent + "60" : "rgba(255,255,255,0.08)"}`,
                    transition: "border-color 0.3s",
                    boxShadow: isHovered
                      ? `0 24px 60px rgba(0,0,0,0.55), 0 0 40px ${cat.accent}20`
                      : "0 8px 30px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* BG Image */}
                  <motion.div
                    animate={{ scale: isHovered ? 1.07 : 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "absolute", inset: 0,
                      backgroundImage: `url(${cat.image})`,
                      backgroundSize: "cover", backgroundPosition: "center",
                      filter: `brightness(${isHovered ? 0.5 : 0.4}) saturate(0.55)`,
                      transition: "filter 0.4s",
                    }}
                  />

                  {/* Gradient */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(135deg, ${cat.accent}15 0%, transparent 50%), linear-gradient(to top, rgba(13,8,20,0.97) 0%, rgba(13,8,20,0.35) 60%, transparent 100%)`,
                  }} />

                  {/* Hover glow */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: `radial-gradient(ellipse 90% 70% at 50% 110%, ${cat.accent}25 0%, transparent 65%)`,
                    }}
                  />

                  {/* Top-left badge */}
                  <div style={{
                    position: "absolute", top: "1rem", left: "1rem",
                    background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
                    border: `1px solid ${cat.accent}30`,
                    borderRadius: "8px", padding: "0.3rem 0.65rem",
                    display: "flex", alignItems: "center", gap: "0.35rem",
                  }}>
                    <Icon size={12} color={cat.accent} />
                    <span style={{ color: cat.accent, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                      {cat.id === "pc" ? "PC" : "MOBILE"}
                    </span>
                  </div>

                  {/* Top-right icon */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0.4, scale: isHovered ? 1 : 0.88 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute", top: "1rem", right: "1rem",
                      width: "38px", height: "38px",
                      background: isHovered ? cat.accent + "30" : "rgba(255,255,255,0.07)",
                      border: `1px solid ${isHovered ? cat.accent + "55" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: "11px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.3s",
                    }}
                  >
                    <Icon size={17} color={isHovered ? cat.accent : "#9ca3af"} />
                  </motion.div>

                  {/* Bottom content */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
                    {/* Active count pill */}
                    <motion.div
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.35rem",
                        background: `${cat.accent}25`, border: `1px solid ${cat.accent}40`,
                        borderRadius: "999px", padding: "0.2rem 0.6rem", marginBottom: "0.6rem",
                      }}
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.3, repeat: Infinity }}
                        style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }}
                      />
                      <span style={{ color: cat.accent, fontSize: "0.62rem", fontWeight: 700 }}>
                        {cat.count}
                      </span>
                    </motion.div>

                    <motion.div
                      animate={{ y: isHovered ? -4 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#fff", marginBottom: "0.3rem", lineHeight: 1.2 }}>
                        {cat.label}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: 1.5 }}>
                        {cat.desc}
                      </p>
                    </motion.div>

                    <motion.div
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.4rem",
                        marginTop: "0.8rem", color: cat.accent, fontSize: "0.82rem", fontWeight: 700,
                      }}
                    >
                      Lihat Tournament <ArrowRight size={14} />
                    </motion.div>
                  </div>

                  {/* Corner accents */}
                  <div style={{
                    position: "absolute", top: 0, left: 0,
                    width: "30px", height: "30px", pointerEvents: "none",
                    borderTop: `2px solid ${cat.accent}40`,
                    borderLeft: `2px solid ${cat.accent}40`,
                    borderRadius: "18px 0 0 0",
                  }} />
                  <div style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: "30px", height: "30px", pointerEvents: "none",
                    borderBottom: `2px solid ${cat.accent}40`,
                    borderRight: `2px solid ${cat.accent}40`,
                    borderRadius: "0 0 18px 0",
                  }} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ marginTop: "1.5rem" }}
        >
          <div style={{
            textAlign: "center", marginBottom: "0.85rem",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
          }}>
            <div style={{
              flex: 1, height: "1px", maxWidth: "120px", marginLeft: "auto",
              background: "linear-gradient(to right, transparent, rgba(139,92,246,0.2))",
            }} />
            <span style={{
              color: "rgba(139,92,246,0.5)", fontSize: "0.62rem",
              fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            }}>
              GAME POPULER
            </span>
            <div style={{
              flex: 1, height: "1px", maxWidth: "120px", marginRight: "auto",
              background: "linear-gradient(to left, transparent, rgba(139,92,246,0.2))",
            }} />
          </div>
          <MarqueeRow items={TICKER_ROW_2} direction="right" speed={50} />
        </motion.div>
      </div>
    </section>
  );
}