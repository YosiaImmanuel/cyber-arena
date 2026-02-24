"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
    {
        q: "Apakah saya perlu membuat akun untuk mengikuti turnamen?",
        a: "Ya. Kamu perlu membuat akun terlebih dahulu untuk bisa membuat tim, bergabung ke tim, dan mendaftar turnamen.",
    },
    {
        q: "Apakah mengikuti turnamen ini gratis?",
        a: "Sebagian turnamen dapat diikuti secara gratis. Jika ada biaya pendaftaran, informasi tersebut akan ditampilkan pada detail turnamen.",
    },
    {
        q: "Bagaimana cara membuat tim?",
        a: "Setelah login, kamu bisa masuk ke menu Tim Saya lalu klik Buat Tim. Kamu juga bisa mengundang pemain lain melalui fitur pencarian user.",
    },
    {
        q: "Apakah saya bisa bergabung ke tim yang sudah ada?",
        a: "Bisa. Kamu dapat menerima undangan dari tim lain atau mengajukan permintaan untuk bergabung jika tersedia.",
    },
    {
        q: "Berapa maksimal anggota dalam satu tim?",
        a: "Jumlah anggota tim menyesuaikan dengan aturan masing-masing turnamen. Detail jumlah maksimal pemain akan tercantum pada halaman turnamen.",
    },
    {
        q: "Bagaimana cara mendaftar turnamen?",
        a: "Pastikan kamu sudah memiliki tim, lalu pilih turnamen yang sedang dibuka dan klik Daftar Turnamen. Pilih tim yang akan kamu daftarkan dan konfirmasi.",
    },
    {
        q: "Di mana saya bisa melihat jadwal pertandingan?",
        a: "Jadwal pertandingan dapat dilihat pada dashboard setelah tim kamu berhasil terdaftar di turnamen.",
    },
    {
        q: "Bagaimana jika jadwal pertandingan berubah?",
        a: "Setiap perubahan jadwal akan diperbarui secara otomatis pada dashboard kamu.",
    },
    {
        q: "Apakah saya bisa mengikuti lebih dari satu turnamen?",
        a: "Ya, selama tim kamu memenuhi syarat dan jadwal tidak berbenturan, kamu dapat mengikuti lebih dari satu turnamen.",
    },
    {
        q: "Bagaimana jika terjadi kendala teknis?",
        a: "Kamu dapat menghubungi tim support melalui halaman kontak atau fitur bantuan yang tersedia di website.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <>
            <style>{`
                .faq-item {
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    transition: border-color 0.2s;
                }
                .faq-item:first-child {
                    border-top: 1px solid rgba(255,255,255,0.06);
                }
                .faq-item.is-open {
                    border-bottom-color: rgba(99,102,241,0.2);
                }
                .faq-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.5rem;
                    padding: 1.4rem 0;
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                }
                .faq-question {
                    font-size: 0.975rem;
                    font-weight: 500;
                    color: rgba(255,255,255,0.75);
                    line-height: 1.5;
                    transition: color 0.2s;
                }
                .faq-item.is-open .faq-question {
                    color: #fff;
                }
                .faq-icon {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    color: rgba(255,255,255,0.3);
                    transition: all 0.25s;
                }
                .faq-item.is-open .faq-icon {
                    border-color: rgba(99,102,241,0.4);
                    color: #818cf8;
                    background: rgba(99,102,241,0.08);
                }
                .faq-answer {
                    font-size: 0.9rem;
                    color: rgba(180,170,210,0.6);
                    line-height: 1.75;
                    padding-bottom: 1.4rem;
                    max-width: 560px;
                }
            `}</style>

            <section style={{
                padding: "6rem 1.5rem",
                maxWidth: "680px",
                margin: "0 auto",
            }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "3.5rem" }}
                >
                    <p style={{
                        fontSize: "0.72rem", fontWeight: 700,
                        letterSpacing: "0.12em", color: "#818cf8",
                        textTransform: "uppercase", marginBottom: "0.75rem",
                    }}>
                        FAQ
                    </p>
                    <h2 style={{
                        fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)",
                        fontWeight: 700, color: "#fff",
                        letterSpacing: "-0.02em", lineHeight: 1.2,
                    }}>
                        Pertanyaan yang sering ditanyakan
                    </h2>
                </motion.div>

                {/* Items */}
                <div>
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            className={`faq-item${open === i ? " is-open" : ""}`}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                        >
                            <button
                                className="faq-btn"
                                onClick={() => setOpen(open === i ? null : i)}
                            >
                                <span className="faq-question">{faq.q}</span>
                                <span className="faq-icon">
                                    <motion.span
                                        animate={{ rotate: open === i ? 45 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ display: "flex" }}
                                    >
                                        <Plus size={12} strokeWidth={2.5} />
                                    </motion.span>
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <p className="faq-answer">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}