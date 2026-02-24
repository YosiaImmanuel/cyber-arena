"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CallToAction() {
    const router = useRouter();

    return (
        <>
            <style>{`
                .cta-section {
                    padding: 4rem 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .cta-box {
                    position: relative;
                    width: 100%;
                    max-width: 900px;
                    background: rgba(255,255,255,0.025);
                    border: 1px solid rgba(99,102,241,0.18);
                    border-radius: 24px;
                    padding: 4rem 3rem;
                    text-align: center;
                    overflow: hidden;
                }

                .cta-title {
                    font-size: clamp(1.6rem, 4vw, 2.5rem);
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: -0.02em;
                    line-height: 1.15;
                    margin-bottom: 0.85rem;
                }

                .cta-desc {
                    color: rgba(180,170,210,0.6);
                    font-size: 0.975rem;
                    line-height: 1.7;
                    max-width: 400px;
                    margin: 0 auto 2rem;
                }

                .cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.45rem;
                    background: linear-gradient(135deg, #4f46e5, #6366f1);
                    color: #fff;
                    font-weight: 700;
                    font-size: 0.9rem;
                    padding: 0.7rem 1.75rem;
                    border-radius: 999px;
                    border: 1px solid rgba(99,102,241,0.35);
                    cursor: pointer;
                    white-space: nowrap;
                    box-shadow: 0 4px 16px rgba(79,70,229,0.35);
                }

                @media (max-width: 600px) {
                    .cta-box { padding: 2.75rem 1.5rem; border-radius: 18px; }
                    .cta-desc { font-size: 0.88rem; }
                }
            `}</style>

            <section className="cta-section">
                <motion.div
                    className="cta-box"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Corner glow top-left */}
                    <div style={{
                        position: "absolute", top: 0, left: 0,
                        width: "260px", height: "260px",
                        background: "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }} />
                    {/* Corner glow bottom-right */}
                    <div style={{
                        position: "absolute", bottom: 0, right: 0,
                        width: "260px", height: "260px",
                        background: "radial-gradient(circle at 100% 100%, rgba(139,92,246,0.1) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }} />

                    {/* Content */}
                    <div style={{ position: "relative", zIndex: 1 }}>
                        {/* Trophy icon badge */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.4 }}
                            style={{
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                width: "52px", height: "52px",
                                background: "rgba(255,255,255,0.15)",
                                border: "1px solid rgba(255,255,255,0.25)",
                                borderRadius: "14px",
                                marginBottom: "1.5rem",
                            }}
                        >
                            <Trophy size={24} color="#fff" strokeWidth={1.8} />
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            className="cta-title"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Mimpi Jadi Juara Dimulai Dari Sini.
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            className="cta-desc"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.28, duration: 0.5 }}
                        >
                            Jangan hanya jadi penonton. Ambil bagian dalam turnamen dan buktikan kemampuanmu.
                        </motion.p>

                        {/* Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35, duration: 0.45 }}
                        >
                            <motion.button
                                className="cta-btn"
                                onClick={() => router.push("/auth/sign-up")}
                                whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Trophy size={14} strokeWidth={2.2} />
                                Ikuti Turnamen
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}