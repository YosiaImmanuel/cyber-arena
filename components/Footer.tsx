"use client";

import { motion } from "framer-motion";
import { Sword } from "lucide-react";
import { useReveal } from "@/hooks/hooks";
import { FOOTER_LINKS } from "@/app/landing-page/data";

export default function Footer() {
    const { ref, inView } = useReveal(0.1);

    return (
        <footer style={{ borderTop: "1px solid var(--border)", padding: "3.5rem 2rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
            <style>{`
                .footer-grid {
                    display: grid;
                    grid-template-columns: 1.8fr 1fr 1fr 1fr;
                    gap: 2.5rem;
                    margin-bottom: 3rem;
                }
                .footer-links-grid {
                    display: contents;
                }
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 2rem;
                    }
                    .footer-brand {
                        grid-column: 1 / -1;
                    }
                }
                @media (max-width: 480px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 1.5rem;
                    }
                    .footer-brand {
                        grid-column: 1 / -1;
                    }
                }
            `}</style>

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="footer-grid"
            >
                {/* Brand */}
                <div className="footer-brand">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.85rem" }}>
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
                    <p style={{ color: "var(--muted)", fontSize: "0.8rem", lineHeight: 1.7, maxWidth: "260px", marginBottom: "1.25rem" }}>
                        Platform terkemuka dunia untuk turnamen gaming amatir dan profesional. Bergabunglah dengan revolusi ini.
                    </p>
                </div>

                {/* Link columns */}
                {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                    <div key={title}>
                        <h4 style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1rem" }}>
                            {title}
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                            {links.map((link) => (
                                <motion.a
                                    key={link} href="#"
                                    whileHover={{ color: "#fff", x: 3 }}
                                    style={{ color: "var(--muted)", fontSize: "0.825rem", transition: "color 0.2s" }}
                                >
                                    {link}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Bottom bar */}
            <div style={{
                borderTop: "1px solid var(--border)", paddingTop: "1.5rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                flexWrap: "wrap", gap: "0.5rem",
            }}>
                <span style={{ color: "var(--dim)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                    © 2024 GAMING ARENA. HAK CIPTA DILINDUNGI.
                </span>
                <span style={{ color: "var(--dim)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                    DIBUAT OLEH GAMER UNTUK GAMER.
                </span>
            </div>
        </footer>
    );
}