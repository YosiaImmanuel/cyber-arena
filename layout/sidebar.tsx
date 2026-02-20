"use client";

import { useSidebar } from "./sidebarProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Trophy,
  Users,
  User,
  LogOut,
  Gamepad2,
  ChevronRight,
  List,
  PlusCircle,
  Star,
} from "lucide-react";
import { signOut } from "@/actions/auth";
import { LucideIcon } from "lucide-react";

interface SubItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  children?: SubItem[];
}


// di sini kalau lu mau ngubah macam macam isi page nya ya yos
const navItems: NavItem[] = [
  {
    icon: Home,
    label: "Home",
    href: "/home",
  },
  {
    icon: Trophy,
    label: "Tournament",
    href: "/tournament",
    //ini contoh subItem di sidebar nya yos tinggal tambahin array, Icon nya jangan lupa di import dlu dari lucide react
    children: [
      { label: "Browse",         href: "/home/tournament",        icon: List },
      { label: "Create",         href: "/home/tournament/create", icon: PlusCircle },
      { label: "My Tournaments", href: "/home/tournament/my",     icon: Star },
    ],
  },
  {
    icon: Users,
    label: "Team",
    href: "/home/team",
    children: [
      { label: "My Team", href: "/home/team",        icon: Users },
      { label: "Create",  href: "/home/team/create", icon: PlusCircle },
    ],
  },
  {
    icon: User,
    label: "Profile",
    href: "/home/profile",
  },
];

// ─── Sub Item ────────────────────────────────────────────────────────
function SubNavItem({ item }: { item: SubItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link href={item.href}>
      <div
        className={`
          flex items-center gap-2 pl-9 pr-3 py-[7px] rounded-lg
          cursor-pointer transition-all duration-150
          ${isActive
            ? "bg-violet-500/10 text-violet-300"
            : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
          }
        `}
      >
        {Icon && <Icon size={13} className="shrink-0" />}
        <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
        {isActive && (
          <div className="ml-auto w-[5px] h-[5px] rounded-full bg-violet-400" />
        )}
      </div>
    </Link>
  );
}

function NavItemComponent({ item, isExpanded }: { item: NavItem; isExpanded: boolean }) {
  const pathname = usePathname();
  const hasChildren = !!item.children?.length;
  const isActive = pathname.startsWith(item.href);
  const [isOpen, setIsOpen] = useState(isActive && hasChildren);
  const Icon = item.icon;

  const baseClass = `
    relative flex items-center gap-3 px-3 py-[10px] rounded-xl
    cursor-pointer overflow-hidden transition-all duration-200
    ${isActive
      ? "bg-violet-500/15 border border-violet-500/30"
      : "border border-transparent hover:bg-white/[0.05]"
    }
  `;

  const activeBar = isActive && (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-violet-400 rounded-r-full" />
  );

  const iconEl = (
    <Icon
      size={18}
      className={`shrink-0 transition-colors duration-200 ${isActive ? "text-violet-400" : "text-gray-500"}`}
    />
  );

  const labelEl = (
    <span
      className={`
        flex-1 text-sm whitespace-nowrap transition-all duration-200
        ${isActive ? "font-semibold text-violet-200" : "font-medium text-gray-400"}
        ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
      `}
    >
      {item.label}
    </span>
  );

  return (
    <div>
      {hasChildren ? (
        <div className={baseClass} onClick={() => isExpanded && setIsOpen(p => !p)}>
          {activeBar}
          {iconEl}
          {labelEl}
          {isExpanded && (
            <ChevronRight
              size={14}
              className={`text-violet-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
            />
          )}
        </div>
      ) : (
        <Link href={item.href}>
          <div className={baseClass}>
            {activeBar}
            {iconEl}
            {labelEl}
            {isExpanded && isActive && (
              <ChevronRight size={14} className="text-violet-400 ml-auto shrink-0" />
            )}
          </div>
        </Link>
      )}

      {hasChildren && isExpanded && (
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "max-h-60 opacity-100 mt-1" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col gap-[2px]">
            {item.children!.map((sub) => (
              <SubNavItem key={sub.href} item={sub} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────
export default function Sidebar() {
  const { isExpanded, setIsExpanded } = useSidebar();

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`
        fixed top-0 left-0 h-screen z-50 flex flex-col
        bg-[#0e0916]/95 border-r border-white/[0.07]
        backdrop-blur-xl overflow-hidden
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-56 shadow-2xl" : "w-16"}
      `}
    >
      {/* Purple glow */}
      <div className="absolute top-1/4 -left-4 w-16 h-48 bg-violet-600/10 blur-2xl pointer-events-none rounded-full" />

      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/[0.06] gap-3 overflow-hidden shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-violet-800 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-violet-900/50">
          <Gamepad2 size={17} className="text-white" />
        </div>
        <span
          className={`
            font-extrabold text-[0.95rem] tracking-wide whitespace-nowrap text-white
            transition-all duration-200
            ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
          `}
        >
          Arena<span className="text-violet-400">Hub</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <NavItemComponent key={item.href} item={item} isExpanded={isExpanded} />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-white/[0.06]">
        <form action={signOut}>
          <button
            type="submit"
            className="
              w-full flex items-center gap-3 px-3 py-[10px] rounded-xl
              border border-transparent overflow-hidden cursor-pointer
              transition-all duration-200 bg-transparent
              hover:bg-red-500/10 hover:border-red-500/20 group
            "
          >
            <LogOut size={18} className="text-gray-500 group-hover:text-red-400 shrink-0 transition-colors duration-200" />
            <span
              className={`
                text-sm font-medium text-gray-400 group-hover:text-red-400 whitespace-nowrap
                transition-all duration-200
                ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
              `}
            >
              Sign Out
            </span>
          </button>
        </form>
      </div>
    </aside>
  );
}