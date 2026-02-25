"use client";

import { useState, useEffect } from "react";
import { signUp } from "@/actions/auth";
import { motion } from "framer-motion";
import { Sword, User, Mail, Lock, ShieldCheck, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
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

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Sudah punya akun?</span>
                    <motion.a
                        onClick={() => router.push("/auth/sign-in")}
                        whileHover={{ opacity: 0.85, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            color: "#a78bfa", border: "1px solid #8b5cf6",
                            fontWeight: 600, fontSize: "0.875rem",
                            padding: "0.45rem 1.1rem", borderRadius: "8px",
                            transition: "background 0.2s", display: "inline-block", cursor: "pointer",
                        }}
                    >
                        Masuk
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
                        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.4rem" }}>Daftar Akun</h1>
                        <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
                            Buat akun untuk mulai berkompetisi.
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
                                type="text" placeholder="Username gaming kamu"
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
                                type="email" placeholder="email@contoh.com"
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
                            Konfirmasi Password
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
                            Saya setuju dengan{" "}
                            <span style={{ color: "#a78bfa", fontWeight: 600 }}>Syarat Layanan</span>
                            {" "}dan{" "}
                            <span style={{ color: "#a78bfa", fontWeight: 600 }}>Kebijakan Privasi</span>
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
                                <> Daftar <ArrowRight size={18} /> </>
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Switch to Login */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.47, duration: 0.4 }}
                        style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.875rem" }}
                    >
                        Sudah punya akun?{" "}
                        <motion.a href="/auth/sign-in" whileHover={{ opacity: 0.8 }}
                            style={{ color: "#a78bfa", fontWeight: 700 }}>
                            Masuk
                        </motion.a>
                    </motion.p>
                </motion.div>
            </main>

            {/* Footer */}
            <div style={{
                position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10,
                padding: "1rem 2rem",
                display: "flex", justifyContent: "center", alignItems: "center",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(19,13,30,0.7)", backdropFilter: "blur(12px)",
            }}>
                <span style={{ color: "#4b5563", fontSize: "0.75rem" }}>
                    © 2024 Cyber Arena. Seluruh hak cipta dilindungi.
                </span>
            </div>
        </>
    );
}