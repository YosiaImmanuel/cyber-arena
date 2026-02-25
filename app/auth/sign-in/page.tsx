"use client";

import { useState, useEffect } from "react";
import { signIn } from "@/actions/auth"; 
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, LogIn, AlertCircle, Sword } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passFocused, setPassFocused] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleSubmit = async () => {
        setError(null);

        if (!email.trim()) return setError("Email tidak boleh kosong");
        if (!password) return setError("Password tidak boleh kosong");

        setLoading(true);

        const formData = new FormData();
        formData.append("email", email.trim());
        formData.append("password", password);

        const result = await signIn(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
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
                    <span style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Belum punya akun?</span>
                    <motion.a
                        onClick={() => router.push("/auth/sign-up")}
                        whileHover={{ opacity: 0.85, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            color: "#a78bfa", border: "1px solid #8b5cf6",
                            fontWeight: 600, fontSize: "0.875rem",
                            padding: "0.45rem 1.1rem", borderRadius: "8px",
                            transition: "background 0.2s", display: "inline-block", cursor: "pointer",
                        }}
                    >
                        Daftar
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
                        style={{ marginBottom: "1.75rem" }}
                    >
                        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.5rem", textAlign: "center" }}>Masuk</h1>
                        <p style={{ color: "#9ca3af", fontSize: "0.9rem", lineHeight: 1.6, textAlign: "center" }}>
                            Selamat datang kembali, player!
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

                    {/* Email Field */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        style={{ marginBottom: "1.1rem" }}
                    >
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                            Email
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
                                type="email" placeholder="Masukkan email kamu"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
                                type={showPass ? "text" : "password"} placeholder="Masukkan password kamu"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPassFocused(true)} onBlur={() => setPassFocused(false)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
                            whileHover={{ opacity: !loading ? 0.9 : 1, boxShadow: !loading ? "0 0 32px rgba(147,51,234,0.45)" : "none" }}
                            whileTap={{ scale: !loading ? 0.98 : 1 }}
                            onClick={handleSubmit}
                            disabled={loading}
                            style={{
                                width: "100%", height: "52px",
                                background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                                color: "#fff", fontWeight: 700, fontSize: "1rem",
                                borderRadius: "10px", marginBottom: "1.5rem",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                                transition: "opacity 0.2s, box-shadow 0.2s",
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? "not-allowed" : "pointer",
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
                                <> Masuk <LogIn size={18} /> </>
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Switch to Register */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.875rem" }}
                    >
                        Belum punya akun?{" "}
                        <motion.a href="/auth/sign-up" whileHover={{ opacity: 0.8 }}
                            style={{ color: "#a78bfa", fontWeight: 700 }}>
                            Daftar
                        </motion.a>
                    </motion.p>
                </motion.div>
            </main>

            {/* Footer */}
            <div style={{
                position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10,
                padding: "1rem 2rem",
                textAlign: "center", 
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