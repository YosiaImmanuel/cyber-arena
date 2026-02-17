"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gamepad2, User, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passFocused, setPassFocused] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
    };

    return (
        <>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #130d1e;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }
        input { outline: none; border: none; background: none; color: #fff; width: 100%; font-size: 0.9rem; font-family: inherit; }
        input::placeholder { color: #6b7280; }
        button { cursor: pointer; border: none; outline: none; font-family: inherit; }
        a { text-decoration: none; color: inherit; }
      `}</style>

            {/* Background */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
                <div style={{
                    position: "absolute", left: "-100px", top: "20%",
                    width: "480px", height: "480px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(109,40,217,0.3) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }} />
                <div style={{
                    position: "absolute", right: "-80px", bottom: "15%",
                    width: "360px", height: "360px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
                }} />
            </div>

            {/* Navbar */}
            <motion.header
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                    height: "60px", padding: "0 2rem",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: scrolled ? "rgba(19,13,30,0.9)" : "rgba(19,13,30,0.5)",
                    backdropFilter: "blur(16px)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    transition: "background 0.3s",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                    <div style={{
                        width: "32px", height: "32px", background: "#8b5cf6",
                        borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <Gamepad2 size={18} color="#fff" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.03em" }}>
                        ARENA <span style={{ color: "#a78bfa" }}>PRO</span>
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "#9ca3af", fontSize: "0.875rem" }}>New here?</span>
                    <motion.a
                        onClick={() => router.push("/auth/sign-up")}
                        whileHover={{ opacity: 0.85, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            color: "#a78bfa", border: "1px solid #8b5cf6",
                            fontWeight: 600, fontSize: "0.875rem",
                            padding: "0.45rem 1.1rem", borderRadius: "8px",
                            transition: "background 0.2s", display: "inline-block",
                        }}
                    >
                        Sign Up
                    </motion.a>
                </div>
            </motion.header>

            {/* Main */}
            <main style={{
                minHeight: "100vh",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "80px 1.5rem 100px",
                position: "relative", zIndex: 1,
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        width: "100%", maxWidth: "420px",
                        background: "rgba(28, 16, 42, 0.85)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "16px", padding: "2.25rem 2rem",
                        backdropFilter: "blur(24px)",
                        boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(139,92,246,0.08)",
                    }}
                >
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        style={{ marginBottom: "2rem" }}
                    >
                        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.5rem" }}>Login Page</h1>
                        <p style={{ color: "#9ca3af", fontSize: "0.9rem", lineHeight: 1.6 }}>
                            Welcome back, player! Ready for the next tournament?
                        </p>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        style={{ marginBottom: "1.1rem" }}
                    >
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                            Email or Username
                        </label>
                        <div style={{
                            display: "flex", alignItems: "center", gap: "0.65rem",
                            background: "rgba(255,255,255,0.05)",
                            border: `1px solid ${emailFocused ? "rgba(139,92,246,0.65)" : "rgba(255,255,255,0.1)"}`,
                            borderRadius: "10px", padding: "0 1rem", height: "52px",
                            transition: "border-color 0.2s",
                            boxShadow: emailFocused ? "0 0 0 3px rgba(139,92,246,0.12)" : "none",
                        }}>
                            <User size={17} color={emailFocused ? "#a78bfa" : "#6b7280"} style={{ flexShrink: 0, transition: "color 0.2s" }} />
                            <input
                                type="text" placeholder="Enter your email or username"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)}
                            />
                        </div>
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        style={{ marginBottom: "1.5rem" }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Password</label>
                            <motion.a href="#" whileHover={{ opacity: 0.75 }}
                                style={{ fontSize: "0.8rem", fontWeight: 600, color: "#a78bfa" }}>
                                Forgot Password?
                            </motion.a>
                        </div>
                        <div style={{
                            display: "flex", alignItems: "center", gap: "0.65rem",
                            background: "rgba(255,255,255,0.05)",
                            border: `1px solid ${passFocused ? "rgba(139,92,246,0.65)" : "rgba(255,255,255,0.1)"}`,
                            borderRadius: "10px", padding: "0 1rem", height: "52px",
                            transition: "border-color 0.2s",
                            boxShadow: passFocused ? "0 0 0 3px rgba(139,92,246,0.12)" : "none",
                        }}>
                            <Lock size={17} color={passFocused ? "#a78bfa" : "#6b7280"} style={{ flexShrink: 0, transition: "color 0.2s" }} />
                            <input
                                type={showPass ? "text" : "password"} placeholder="Enter your password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPassFocused(true)} onBlur={() => setPassFocused(false)}
                            />
                            <motion.button
                                whileHover={{ opacity: 0.7 }}
                                onClick={() => setShowPass(!showPass)}
                                style={{ background: "none", color: "#6b7280", display: "flex", padding: "0.25rem", flexShrink: 0 }}
                            >
                                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Sign In Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.4 }}
                    >
                        <motion.button
                            whileHover={{ opacity: 0.9, boxShadow: "0 0 32px rgba(147,51,234,0.45)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            style={{
                                width: "100%", height: "52px",
                                background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                                color: "#fff", fontWeight: 700, fontSize: "1rem",
                                borderRadius: "10px", marginBottom: "1.5rem",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                                transition: "opacity 0.2s, box-shadow 0.2s",
                            }}
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        width: "20px", height: "20px",
                                        border: "2px solid rgba(255,255,255,0.3)",
                                        borderTopColor: "#fff", borderRadius: "50%",
                                    }}
                                />
                            ) : (
                                <> Sign In <LogIn size={18} /> </>
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}
                    >
                        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
                        <span style={{ color: "#6b7280", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em" }}>
                            OR CONTINUE WITH
                        </span>
                        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
                    </motion.div>

                    {/* Social Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}
                    >
                        <motion.button
                            whileHover={{ borderColor: "rgba(88,101,242,0.55)", background: "rgba(88,101,242,0.12)" }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "10px", padding: "0.7rem", color: "#fff",
                                fontSize: "0.875rem", fontWeight: 600, transition: "all 0.2s",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#5865F2">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                            </svg>
                            Discord
                        </motion.button>
                        <motion.button
                            whileHover={{ borderColor: "rgba(145,70,255,0.55)", background: "rgba(145,70,255,0.12)" }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "10px", padding: "0.7rem", color: "#fff",
                                fontSize: "0.875rem", fontWeight: 600, transition: "all 0.2s",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#9146FF">
                                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                            </svg>
                            Twitch
                        </motion.button>
                    </motion.div>

                    {/* Switch to Register */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.875rem" }}
                    >
                        Don&apos;t have an account?{" "}
                        <motion.a href="/register" whileHover={{ opacity: 0.8 }}
                            style={{ color: "#a78bfa", fontWeight: 700 }}>
                            Join the tournament
                        </motion.a>
                    </motion.p>
                </motion.div>
            </main>

            {/* Footer */}
            <div style={{
                position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10,
                padding: "1rem 2rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(19,13,30,0.7)", backdropFilter: "blur(12px)",
            }}>
                <span style={{ color: "#4b5563", fontSize: "0.75rem" }}>
                    © 2024 Arena Pro Gaming Platform. All rights reserved.
                </span>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                    {["Privacy Policy", "Terms of Service", "Support"].map((item) => (
                        <motion.a key={item} href="#" whileHover={{ color: "#9ca3af" }}
                            style={{ color: "#4b5563", fontSize: "0.75rem", transition: "color 0.2s" }}>
                            {item}
                        </motion.a>
                    ))}
                </div>
            </div>
        </>
    );
}