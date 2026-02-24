"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sword, X, Menu, ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
    { label: "Beranda", href: "/" },
    { label: "Kontak",  href: "/landing-page/contact" },
    { label: "FAQ",     href: "/landing-page/FAQ" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <>
            <style>{`
                * { box-sizing: border-box; }

                .nav-pill-desktop { display: flex; }
                .nav-cta-desktop { display: flex; }
                .nav-hamburger { display: none; }

                .nav-link-item {
                    position: relative;
                    color: rgba(200, 210, 255, 0.65);
                    font-size: 0.875rem;
                    font-weight: 500;
                    padding: 0.45rem 1.1rem;
                    border-radius: 999px;
                    cursor: pointer;
                    transition: color 0.25s ease;
                    letter-spacing: 0.01em;
                    white-space: nowrap;
                    text-decoration: none;
                    border: none;
                    background: transparent;
                    display: inline-block;
                }

                .nav-link-item:hover { color: rgba(255,255,255,0.95); }
                .nav-link-item.active { color: #fff; }

                .nav-link-dot {
                    position: absolute;
                    bottom: 2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: #6366f1;
                    box-shadow: 0 0 6px rgba(99,102,241,0.8);
                }

                @media (max-width: 768px) {
                    .nav-pill-desktop { display: none !important; }
                    .nav-cta-desktop { display: none !important; }
                    .nav-hamburger { display: flex !important; }
                }
            `}</style>

            <div>
                <motion.header
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: menuOpen ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        pointerEvents: menuOpen ? "none" : "auto",
                        position: "fixed",
                        top: "16px", left: 0, right: 0,
                        zIndex: 100, height: "64px",
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 2rem",
                    }}
                >
                    {/* ── Logo ── */}
                    <motion.div
                        onClick={() => router.push("/")}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                            display: "flex", alignItems: "center", gap: "0.55rem",
                            cursor: "pointer", position: "relative", userSelect: "none",
                        }}
                    >
                        <motion.div
                            animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.15, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                                width: "36px", height: "36px",
                                background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)",
                                filter: "blur(10px)", pointerEvents: "none",
                            }}
                        />
                        <div style={{
                            width: "34px", height: "34px",
                            background: "linear-gradient(135deg, #4f46e5, #6366f1, #818cf8)",
                            borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 4px 16px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
                            position: "relative",
                        }}>
                            <Sword size={17} color="#fff" strokeWidth={2.2} />
                        </div>
                        <span style={{ fontWeight: 800, fontSize: "1.3rem", letterSpacing: "0.15em", color: "#fff" }}>
                            CYBER ARENA
                        </span>
                    </motion.div>

                    {/* ── Center Pill Nav ── */}
                    <nav
                        className="nav-pill-desktop"
                        style={{
                            alignItems: "center", gap: "0.1rem",
                            background: "rgba(255,255,255,0.045)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            borderRadius: "999px", padding: "0.32rem 0.4rem",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 2px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                        }}
                    >
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.href}
                                className={`nav-link-item${isActive(link.href) ? " active" : ""}`}
                                onClick={() => router.push(link.href)}
                            >
                                {link.label}
                                {isActive(link.href) && (
                                    <motion.span
                                        layoutId="nav-active-dot"
                                        className="nav-link-dot"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* ── CTA ── */}
                    <div className="nav-cta-desktop" style={{ alignItems: "center" }}>
                        <motion.button
                            onClick={() => router.push("/auth/sign-up")}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: "flex", alignItems: "center",
                                borderRadius: "999px", overflow: "hidden",
                                border: "1px solid rgba(99,102,241,0.35)",
                                boxShadow: "0 4px 16px rgba(79,70,229,0.35)",
                                cursor: "pointer", padding: 0, background: "transparent",
                            }}
                        >
                            <span style={{
                                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                color: "#fff", fontWeight: 600, fontSize: "0.855rem",
                                padding: "0.52rem 1.35rem", letterSpacing: "0.01em", whiteSpace: "nowrap",
                            }}>
                                Gabung Sekarang
                            </span>
                        </motion.button>
                    </div>

                    {/* ── Hamburger ── */}
                    <motion.button
                        className="nav-hamburger"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            background: "rgba(99,102,241,0.1)",
                            border: "1px solid rgba(99,102,241,0.2)",
                            borderRadius: "10px", width: "42px", height: "42px",
                            alignItems: "center", justifyContent: "center",
                            color: "#818cf8", cursor: "pointer",
                        }}
                    >
                        <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.div>
                    </motion.button>
                </motion.header>

                {/* ── Mobile Drawer ── */}
                <AnimatePresence>
                    {menuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    position: "fixed", inset: 0, zIndex: 90,
                                    background: "rgba(0,0,8,0.7)", backdropFilter: "blur(10px)",
                                }}
                            />
                            <motion.div
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 95,
                                    width: "min(300px, 85vw)",
                                    background: "linear-gradient(160deg, rgba(4,4,20,0.99) 0%, rgba(10,8,35,0.99) 100%)",
                                    backdropFilter: "blur(30px)",
                                    borderLeft: "1px solid rgba(99,102,241,0.12)",
                                    display: "flex", flexDirection: "column",
                                    padding: "1.25rem",
                                    boxShadow: "-16px 0 48px rgba(0,0,0,0.6)",
                                }}
                            >
                                <div style={{
                                    position: "absolute", top: 0, left: 0, right: 0, height: "220px",
                                    background: "radial-gradient(ellipse 90% 60% at 60% 0%, rgba(99,102,241,0.1) 0%, transparent 70%)",
                                    pointerEvents: "none",
                                }} />

                                {/* Drawer Header */}
                                <div style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    marginBottom: "2rem", paddingBottom: "1.2rem",
                                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                                    position: "relative", zIndex: 1,
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <div style={{
                                            width: "30px", height: "30px",
                                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                            borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                                            boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
                                        }}>
                                            <Sword size={15} color="#fff" strokeWidth={2.2} />
                                        </div>
                                        <span style={{
                                            fontWeight: 800, fontSize: "1rem", letterSpacing: "0.08em",
                                            background: "linear-gradient(135deg, #fff, #c7d2fe)",
                                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                        }}>CYBER ARENA</span>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setMenuOpen(false)}
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "8px", width: "34px", height: "34px",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "#818cf8", cursor: "pointer",
                                        }}
                                    >
                                        <X size={16} />
                                    </motion.button>
                                </div>

                                {/* Nav Links */}
                                <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1, position: "relative", zIndex: 1 }}>
                                    {NAV_LINKS.map((link, i) => (
                                        <motion.button
                                            key={link.href}
                                            initial={{ opacity: 0, x: 25 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                            onClick={() => { router.push(link.href); setMenuOpen(false); }}
                                            whileHover={{ x: 5 }}
                                            style={{
                                                color: isActive(link.href) ? "#c7d2fe" : "rgba(200,210,255,0.55)",
                                                fontSize: "0.93rem", fontWeight: 500,
                                                padding: "0.85rem 1rem", borderRadius: "10px",
                                                background: isActive(link.href) ? "rgba(99,102,241,0.1)" : "transparent",
                                                border: isActive(link.href) ? "1px solid rgba(99,102,241,0.18)" : "1px solid transparent",
                                                transition: "background 0.2s, color 0.2s",
                                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                                cursor: "pointer", textAlign: "left",
                                            }}
                                        >
                                            {link.label}
                                            <ArrowRight size={13} style={{ opacity: 0.35 }} />
                                        </motion.button>
                                    ))}
                                </nav>

                                {/* CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.28, duration: 0.4 }}
                                    style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 1 }}
                                >
                                    <motion.button
                                        onClick={() => { router.push("/auth/sign-up"); setMenuOpen(false); }}
                                        whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(79,70,229,0.45)" }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                                            color: "#fff", fontSize: "0.875rem", fontWeight: 600,
                                            padding: "0.85rem", borderRadius: "10px",
                                            cursor: "pointer", width: "100%",
                                            boxShadow: "0 4px 16px rgba(79,70,229,0.35)", border: "none",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}
                                    >
                                        Gabung Sekarang
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}