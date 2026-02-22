"use client";

//ini buat header yos kalo mau nambahin sesuatu di header, tambahnya di sini

import { useSidebar } from "./sidebarProvider";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Search, Gamepad2 } from "lucide-react";

export default function Header() {
  const { isExpanded } = useSidebar();
  const [username, setUsername] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Baca dari tabel profiles, bukan user_metadata
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      setUsername(
        profile?.username ||
        user.email?.split("@")[0] ||
        "Player"
      );
    };

    fetchUsername();

    // Realtime: subscribe ke perubahan tabel profiles
    // supaya header langsung update saat user edit username di halaman profil
    const supabase = createClient();
    const channel = supabase
      .channel("profile-username-change")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles" },
        (payload) => {
          if (payload.new?.username) {
            setUsername(payload.new.username);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <header
      className={`
        fixed top-0 right-0 h-16 z-40 flex items-center px-6
        border-b border-white/[0.07] backdrop-blur-xl
        transition-all duration-300 ease-in-out
        ${scrolled ? "bg-[#0e0916]/95" : "bg-[#0e0916]/70"}
        ${isExpanded ? "left-56" : "left-16"}
      `}
    >
      {/* Nama website di tengah */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-violet-800 rounded-lg flex items-center justify-center shadow-lg shadow-violet-900/50">
          <Gamepad2 size={14} className="text-white" />
        </div>
        <span className="font-extrabold text-[0.95rem] tracking-wide text-white">
          Arena<span className="text-violet-400">Hub</span>
        </span>
      </div>

      {/* Kanan: Search + Avatar */}
      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <button className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center cursor-pointer hover:bg-violet-500/15 hover:border-violet-500/30 transition-all duration-200">
          <Search size={15} className="text-gray-400" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-white/[0.05] border border-white/[0.08] cursor-pointer hover:bg-violet-500/10 hover:border-violet-500/20 transition-all duration-200">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {username ? username[0].toUpperCase() : "?"}
          </div>
          <span className="text-[0.8rem] font-semibold text-violet-200 whitespace-nowrap">
            {username || "Player"}
          </span>
        </div>
      </div>
    </header>
  );
}