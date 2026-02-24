

/* ============================================================
   TYPES
   ============================================================ */
export interface Tournament {
    tag: string;
    tagColor: string;
    badge: string;
    badgeColor: string;
    badgeBg: string;
    title: string;
    prize: string;
    date: string;
    image: string;
    ctaLabel: string;
    isLive?: boolean;
}

export interface Player {
    rank: number;
    initial: string;
    color: string;
    name: string;
    tournament: string;
    winnings: string;
}

/* ============================================================
   DATA
   ============================================================ */
export const NAV_LINKS = ["Turnamen", "Papan Peringkat", "FAQ"];

export const TOURNAMENTS: Tournament[] = [
    {
        tag: "VALORANT",
        tagColor: "#ff4655",
        badge: "LANGSUNG",
        badgeColor: "#fff",
        badgeBg: "#ef4444",
        title: "Valorant Open Series",
        prize: "Total Hadiah $5,000",
        date: "Mulai 29 Okt 2024",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
        ctaLabel: "Daftar",
        isLive: true,
    },
    {
        tag: "MOBILE LEGENDS",
        tagColor: "#a78bfa",
        badge: "AKAN DATANG",
        badgeColor: "#a78bfa",
        badgeBg: "rgba(124,58,237,0.3)",
        title: "MLBB Masters Cup",
        prize: "Total Hadiah $3,000",
        date: "Mulai 25 Okt 2024",
        image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80",
        ctaLabel: "Ingatkan Saya",
    },
    {
        tag: "PUBG MOBILE",
        tagColor: "#f59e0b",
        badge: "EVENT UTAMA",
        badgeColor: "#f59e0b",
        badgeBg: "rgba(245,158,11,0.2)",
        title: "PUBG Pro Invitationals",
        prize: "Total Hadiah $10,000",
        date: "Mulai 01 Nov 2024",
        image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&q=80",
        ctaLabel: "Registrasi",
    },
];

export const FOOTER_LINKS: Record<string, string[]> = {
    TURNAMEN: ["Game FPS", "MOBA", "Battle Royale"],
    PERUSAHAAN: ["Tentang Kami", "Program Partner", "Karir", "Kontak"],
    LEGAL: ["Syarat & Ketentuan", "Kebijakan Privasi", "Aturan"],
};
