"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, X, Menu, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "../data";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <style>{`
                .nav-links-desktop { display: flex; }
                .nav-auth-desktop { display: flex; }
                .nav-hamburger { display: none; }
                @media (max-width: 768px) {
                    .nav-links-desktop { display: none; }
                    .nav-auth-desktop { display: none; }
                    .nav-hamburger { display: flex; }
                }
            `}</style>

            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                    padding: "0 1.5rem", height: "70px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: scrolled || menuOpen 
                        ? "linear-gradient(to bottom, rgba(5,3,13,0.98), rgba(5,3,13,0.95))"
                        : "transparent",
                    backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
                    borderBottom: scrolled || menuOpen 
                        ? "1px solid rgba(139,92,246,0.12)" 
                        : "1px solid transparent",
                    boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
                    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
            >
                {/* Logo with glow */}
                <motion.div 
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", position: "relative" }}
                    onClick={() => router.push("/")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {/* Logo glow effect */}
                    <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                            width: "32px", height: "32px",
                            background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
                            filter: "blur(8px)", pointerEvents: "none",
                        }}
                    />
                    <div style={{
                        width: "32px", height: "32px",
                        background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                        borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(139,92,246,0.3)",
                        position: "relative",
                    }}>
                        <Gamepad2 size={17} color="#fff" />
                    </div>
                    <span style={{ 
                        fontWeight: 900, fontSize: "1.05rem", letterSpacing: "0.06em", color: "#fff",
                        background: "linear-gradient(135deg, #fff, #e5e7eb)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>
                        ARENA
                    </span>
                </motion.div>

                {/* Nav Links — Desktop */}
                <nav className="nav-links-desktop" style={{ alignItems: "center", gap: "0.5rem" }}>
                    {NAV_LINKS.map((link) => (
                        <motion.a
                            key={link} href="#"
                            whileHover={{ y: -1 }}
                            style={{
                                color: "#9ca3af", fontSize: "0.875rem", fontWeight: 500,
                                padding: "0.5rem 1rem", borderRadius: "8px",
                                transition: "all 0.2s", position: "relative",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#fff";
                                e.currentTarget.style.background = "rgba(139,92,246,0.08)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = "#9ca3af";
                                e.currentTarget.style.background = "transparent";
                            }}
                        >
                            {link}
                        </motion.a>
                    ))}
                </nav>

                {/* Auth — Desktop */}
                <div className="nav-auth-desktop" style={{ alignItems: "center", gap: "0.65rem" }}>
                    <motion.button
                        onClick={() => router.push("/auth/sign-in")}
                        whileHover={{ color: "#fff", background: "rgba(255,255,255,0.05)" }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            background: "transparent", color: "#9ca3af",
                            fontSize: "0.875rem", fontWeight: 500,
                            padding: "0.55rem 1.1rem", borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.08)",
                            transition: "all 0.2s", cursor: "pointer",
                        }}
                    >
                        Sign in
                    </motion.button>
                    <motion.button
                        onClick={() => router.push("/auth/sign-up")}
                        whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(139,92,246,0.5)" }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                            color: "#fff", fontSize: "0.875rem", fontWeight: 700,
                            padding: "0.55rem 1.35rem", borderRadius: "8px",
                            border: "none", cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: "0 4px 14px rgba(139,92,246,0.3)",
                        }}
                    >
                        Gabung Sekarang
                    </motion.button>
                </div>

                {/* Hamburger — Mobile */}
                <motion.button
                    className="nav-hamburger"
                    whileHover={{ scale: 1.05, background: "rgba(139,92,246,0.12)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "10px", width: "42px", height: "42px",
                        alignItems: "center", justifyContent: "center",
                        color: "#fff", cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                >
                    <motion.div
                        animate={{ rotate: menuOpen ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.div>
                </motion.button>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop with blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                position: "fixed", inset: 0, zIndex: 90,
                                background: "rgba(0,0,0,0.6)",
                                backdropFilter: "blur(8px)",
                            }}
                        />

                        {/* Drawer with gradient */}
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 95,
                                width: "min(320px, 85vw)",
                                background: "linear-gradient(135deg, rgba(5,3,13,0.98) 0%, rgba(8,5,20,0.98) 100%)",
                                backdropFilter: "blur(24px)",
                                borderLeft: "1px solid rgba(139,92,246,0.15)",
                                display: "flex", flexDirection: "column",
                                padding: "1.25rem",
                                boxShadow: "-10px 0 40px rgba(0,0,0,0.5)",
                            }}
                        >
                            {/* Gradient accent */}
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0, height: "200px",
                                background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }} />

                            {/* Drawer header */}
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                marginBottom: "2rem", paddingBottom: "1.25rem",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                position: "relative", zIndex: 1,
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                                    <div style={{
                                        width: "30px", height: "30px",
                                        background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                                        borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                                        boxShadow: "0 4px 12px rgba(139,92,246,0.3)",
                                    }}>
                                        <Gamepad2 size={16} color="#fff" />
                                    </div>
                                    <span style={{ fontWeight: 900, fontSize: "1.05rem", letterSpacing: "0.06em", color: "#fff" }}>
                                        ARENA
                                    </span>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.9, rotate: 90 }}
                                    onClick={() => setMenuOpen(false)}
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "8px", width: "36px", height: "36px",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fff", cursor: "pointer",
                                    }}
                                >
                                    <X size={17} />
                                </motion.button>
                            </div>

                            {/* Nav links with stagger */}
                            <nav style={{ 
                                display: "flex", flexDirection: "column", gap: "0.3rem", 
                                flex: 1, position: "relative", zIndex: 1,
                            }}>
                                {NAV_LINKS.map((link, i) => (
                                    <motion.a
                                        key={link} href="#"
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        onClick={() => setMenuOpen(false)}
                                        whileHover={{ x: 4 }}
                                        style={{
                                            color: "#9ca3af", fontSize: "0.95rem", fontWeight: 500,
                                            padding: "0.9rem 1.1rem", borderRadius: "12px",
                                            transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "space-between",
                                            position: "relative", overflow: "hidden",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "rgba(139,92,246,0.1)";
                                            e.currentTarget.style.color = "#fff";
                                            e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "#9ca3af";
                                            e.currentTarget.style.borderColor = "transparent";
                                        }}
                                    >
                                        {link}
                                        <ArrowRight size={14} style={{ opacity: 0.4 }} />
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Auth buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                style={{
                                    display: "flex", flexDirection: "column", gap: "0.65rem",
                                    paddingTop: "1.5rem",
                                    borderTop: "1px solid rgba(255,255,255,0.08)",
                                    position: "relative", zIndex: 1,
                                }}
                            >
                                <motion.button
                                    onClick={() => { router.push("/auth/sign-in"); setMenuOpen(false); }}
                                    whileHover={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(139,92,246,0.3)" }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "#9ca3af", fontSize: "0.875rem", fontWeight: 600,
                                        padding: "0.85rem", borderRadius: "12px",
                                        cursor: "pointer", transition: "all 0.2s",
                                        width: "100%",
                                    }}
                                >
                                    Sign In
                                </motion.button>
                                <motion.button
                                    onClick={() => { router.push("/auth/sign-up"); setMenuOpen(false); }}
                                    whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(139,92,246,0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                                        color: "#fff", fontSize: "0.875rem", fontWeight: 700,
                                        padding: "0.85rem", borderRadius: "12px",
                                        cursor: "pointer", width: "100%",
                                        boxShadow: "0 4px 14px rgba(139,92,246,0.3)",
                                        border: "none",
                                    }}
                                >
                                    Gabung Sekarang
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}