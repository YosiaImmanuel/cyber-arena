"use client";

import { useSidebar } from "./sidebarProvider";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function useCurrentDate() {
  const [date, setDate] = useState("")

  useEffect(() => {
    const format = () => {
      const now = new Date()
      setDate(now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }))
    }
    format()
    const interval = setInterval(format, 60_000)
    return () => clearInterval(interval)
  }, [])

  return date
}

export default function Header() {
  const { isExpanded } = useSidebar();
  const [username, setUsername] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const date = useCurrentDate();

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

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      setUsername(profile?.username || user.email?.split("@")[0] || "Player");
    };

    fetchUsername();

    const supabase = createClient();
    const channel = supabase
      .channel("profile-username-change")
      .on("postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles" },
        (payload) => { if (payload.new?.username) setUsername(payload.new.username) }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel) };
  }, []);

  const initials = username ? username[0].toUpperCase() : "?"

  return (
    <header
      className={`
        hidden md:flex
        fixed top-0 right-0 h-16 z-40 items-center px-6
        border-b border-white/[0.07] backdrop-blur-xl
        transition-all duration-300 ease-in-out
        ${scrolled ? "bg-[#0e0916]/95" : "bg-[#0e0916]/70"}
        ${isExpanded ? "left-56" : "left-16"}
      `}
    >
      <span className="text-xs text-gray-400 font-medium capitalize">{date}</span>


      {/* Avatar bulat */}
      <div className="ml-auto">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-violet-500/30 cursor-pointer hover:ring-2 hover:ring-violet-500/50 transition-all duration-200">
          {initials}
        </div>
      </div>
    </header>
  );
}