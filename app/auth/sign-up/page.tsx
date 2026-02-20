"use client";

import { useState, useEffect } from "react";
import { signUp } from "@/actions/auth";
import { motion } from "framer-motion";
import { Gamepad2, User, Mail, Lock, ShieldCheck, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [error, setError] = useState<string | null>(null); 

    const [userFocused, setUserFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passFocused, setPassFocused] = useState(false);
    const [confirmFocused, setConfirmFocused] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleSubmit = async () => {
        if (!agreed) return;
        setError(null);

        if (!username.trim()) return setError("Username tidak boleh kosong");
        if (!email.trim()) return setError("Email tidak boleh kosong");
        if (password.length < 6) return setError("Password minimal 6 karakter");
        if (password !== confirm) return setError("Password dan konfirmasi password tidak cocok");

        setLoading(true);

        const formData = new FormData();
        formData.append("username", username.trim());
        formData.append("email", email.trim());
        formData.append("password", password);

        const result = await signUp(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    const inputBox = (focused: boolean) => ({
        display: "flex", alignItems: "center", gap: "0.65rem",
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${focused ? "rgba(139,92,246,0.65)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "10px", padding: "0 1rem", height: "52px",
        transition: "border-color 0.2s",
        boxShadow: focused ? "0 0 0 3px rgba(139,92,246,0.12)" : "none",
    } as React.CSSProperties);

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
                        Arena<span style={{ color: "#a78bfa" }}>Hub</span>
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Already a member?</span>
                    <motion.a
                        onClick={() => router.push("/auth/sign-in")}
                        whileHover={{ opacity: 0.85, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            color: "#a78bfa", fontWeight: 600, fontSize: "0.875rem",
                            transition: "opacity 0.2s", display: "inline-block", cursor: "pointer",
                        }}
                    >
                        Sign In
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
                        borderRadius: "16px", padding: "2rem",
                        backdropFilter: "blur(24px)",
                        boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(139,92,246,0.08)",
                    }}
                >
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        style={{ textAlign: "center", marginBottom: "1.75rem" }}
                    >
                        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.4rem" }}>Register Page</h1>
                        <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
                            Create your account to start competing.
                        </p>
                    </motion.div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                display: "flex", alignItems: "center", gap: "0.5rem",
                                background: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.3)",
                                borderRadius: "8px", padding: "0.75rem 1rem",
                                marginBottom: "1rem",
                            }}
                        >
                            <AlertCircle size={16} color="#f87171" style={{ flexShrink: 0 }} />
                            <span style={{ color: "#f87171", fontSize: "0.875rem" }}>{error}</span>
                        </motion.div>
                    )}

                    {/* Username */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        style={{ marginBottom: "1rem" }}
                    >
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                            Username
                        </label>
                        <div style={inputBox(userFocused)}>
                            <User size={17} color={userFocused ? "#a78bfa" : "#6b7280"} style={{ flexShrink: 0, transition: "color 0.2s" }} />
                            <input
                                type="text" placeholder="Your gaming handle"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setUserFocused(true)} onBlur={() => setUserFocused(false)}
                            />
                        </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        style={{ marginBottom: "1rem" }}
                    >
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                            Email
                        </label>
                        <div style={inputBox(emailFocused)}>
                            <Mail size={17} color={emailFocused ? "#a78bfa" : "#6b7280"} style={{ flexShrink: 0, transition: "color 0.2s" }} />
                            <input
                                type="email" placeholder="email@example.com"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)}
                            />
                        </div>
                    </motion.div>

                    {/* Password */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.4 }}
                        style={{ marginBottom: "1rem" }}
                    >
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                            Password
                        </label>
                        <div style={inputBox(passFocused)}>
                            <Lock size={17} color={passFocused ? "#a78bfa" : "#6b7280"} style={{ flexShrink: 0, transition: "color 0.2s" }} />
                            <input
                                type={showPass ? "text" : "password"} placeholder="••••••••"
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

                    {/* Confirm Password */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        style={{ marginBottom: "1.1rem" }}
                    >
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                            Confirm Password
                        </label>
                        <div style={inputBox(confirmFocused)}>
                            <ShieldCheck size={17} color={confirmFocused ? "#a78bfa" : "#6b7280"} style={{ flexShrink: 0, transition: "color 0.2s" }} />
                            <input
                                type="password" placeholder="••••••••"
                                value={confirm} onChange={(e) => setConfirm(e.target.value)}
                                onFocus={() => setConfirmFocused(true)} onBlur={() => setConfirmFocused(false)}
                            />
                        </div>
                    </motion.div>

                    {/* Terms Checkbox */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.33, duration: 0.4 }}
                        onClick={() => setAgreed(!agreed)}
                        style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem", cursor: "pointer" }}
                    >
                        <div style={{
                            width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                            border: `1px solid ${agreed ? "#8b5cf6" : "rgba(255,255,255,0.15)"}`,
                            background: agreed ? "#8b5cf6" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s",
                        }}>
                            {agreed && (
                                <motion.svg
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    width="11" height="11" viewBox="0 0 12 12"
                                >
                                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </motion.svg>
                            )}
                        </div>
                        <span style={{ fontSize: "0.825rem", color: "#9ca3af", lineHeight: 1.5 }}>
                            I agree to the{" "}
                            <span style={{ color: "#a78bfa", fontWeight: 600 }}>Terms of Service</span>
                            {" "}and{" "}
                            <span style={{ color: "#a78bfa", fontWeight: 600 }}>Privacy Policy</span>
                        </span>
                    </motion.div>

                    {/* Sign Up Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.37, duration: 0.4 }}
                    >
                        <motion.button
                            whileHover={{
                                opacity: agreed && !loading ? 0.9 : 1,
                                boxShadow: agreed && !loading ? "0 0 32px rgba(147,51,234,0.45)" : "none",
                            }}
                            whileTap={{ scale: agreed && !loading ? 0.98 : 1 }}
                            onClick={handleSubmit}
                            disabled={loading}
                            style={{
                                width: "100%", height: "52px",
                                background: agreed
                                    ? "linear-gradient(135deg, #9333ea, #7c3aed)"
                                    : "rgba(139,92,246,0.25)",
                                color: "#fff", fontWeight: 700, fontSize: "1rem",
                                borderRadius: "10px", marginBottom: "1.5rem",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                                transition: "all 0.25s",
                                cursor: agreed && !loading ? "pointer" : "not-allowed",
                                opacity: loading ? 0.7 : 1,
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
                                <> Sign Up <ArrowRight size={18} /> </>
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}
                    >
                        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
                        <span style={{ color: "#6b7280", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em" }}>
                            OR JOIN WITH
                        </span>
                        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
                    </motion.div>

                    {/* Social Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.43, duration: 0.4 }}
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

                    {/* Switch to Login */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.47, duration: 0.4 }}
                        style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.875rem" }}
                    >
                        Already have an account?{" "}
                        <motion.a href="/auth/sign-in" whileHover={{ opacity: 0.8 }}
                            style={{ color: "#a78bfa", fontWeight: 700 }}>
                            Sign In
                        </motion.a>
                    </motion.p>
                </motion.div>
            </main>

            {/* Live Status Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                    position: "fixed", bottom: "58px", left: 0, right: 0,
                    display: "flex", justifyContent: "center", gap: "3rem",
                    zIndex: 10, pointerEvents: "none",
                }}
            >
                {[
                    { text: "14.2K ACTIVE TOURNAMENTS" },
                    { text: "LIVE PRIZE POOLS: $2.4M" },
                ].map(({ text }) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <motion.div
                            animate={{ opacity: [1, 0.35, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e" }}
                        />
                        <span style={{ color: "#4b5563", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em" }}>
                            {text}
                        </span>
                    </div>
                ))}
            </motion.div>

            {/* Footer */}
            <div style={{
                position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10,
                padding: "1rem 2rem",
                display: "flex", justifyContent: "center", alignItems: "center",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(19,13,30,0.7)", backdropFilter: "blur(12px)",
            }}>
                <span style={{ color: "#4b5563", fontSize: "0.75rem" }}>
                    © 2024 ArenaHub Gaming Platforms. All rights reserved.
                </span>
            </div>
        </>
    );
}