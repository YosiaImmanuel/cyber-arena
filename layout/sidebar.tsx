"use client";

import { useSidebar } from "./sidebarProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Home, Trophy, Users, User, LogOut,
  ChevronRight, ChevronDown, List, PlusCircle, Star, Menu, X,
  Sword,
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

const navItems: NavItem[] = [
  { icon: Home,   label: "Home",       href: "/home" },
  {
    icon: Trophy, label: "Tournament", href: "/tournament",
    children: [
      { label: "Browse",        href: "/tournament",              icon: List       },
      { label: "Create",        href: "/tournament/create",       icon: PlusCircle },
      { label: "My Tournament", href: "/tournament/mytournament", icon: Star       },
    ],
  },
  {
    icon: Users, label: "Team", href: "/team",
    children: [
      { label: "My Team", href: "/team",        icon: Users      },
      { label: "Create",  href: "/team/create", icon: PlusCircle },
    ],
  },
  { icon: User, label: "Profile", href: "/profile" },
];

// ─── Sub Item ────────────────────────────────────────────────────────
function SubNavItem({ item, onNavigate }: { item: SubItem; onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link href={item.href} onClick={onNavigate}>
      <div style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        paddingLeft: "2.25rem", paddingRight: "0.75rem", paddingTop: "7px", paddingBottom: "7px",
        borderRadius: "8px", cursor: "pointer",
        transition: "all 0.15s",
        background: isActive ? "rgba(79,70,229,0.1)" : "transparent",
        color: isActive ? "#a5b4fc" : "rgba(156,163,175,0.7)",
      }}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#d1d5db"; } }}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(156,163,175,0.7)"; } }}
      >
        {Icon && <Icon size={13} style={{ flexShrink: 0 }} />}
        <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>{item.label}</span>
        {isActive && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "#818cf8" }} />}
      </div>
    </Link>
  );
}

// ─── Desktop Nav Item ────────────────────────────────────────────────
function DesktopNavItem({ item, isExpanded }: { item: NavItem; isExpanded: boolean }) {
  const pathname = usePathname();
  const hasChildren = !!item.children?.length;
  const isActive = pathname.startsWith(item.href);
  const [isOpen, setIsOpen] = useState(isActive && hasChildren);
  const Icon = item.icon;

  const baseStyle: React.CSSProperties = {
    position: "relative",
    display: "flex", alignItems: "center", gap: "0.75rem",
    padding: "10px 12px", borderRadius: "12px",
    cursor: "pointer", overflow: "hidden",
    transition: "all 0.2s",
    background: isActive ? "rgba(79,70,229,0.12)" : "transparent",
    border: isActive ? "1px solid rgba(99,102,241,0.28)" : "1px solid transparent",
  };

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    color: isActive ? "#818cf8" : "rgba(107,114,128,0.9)",
  };

  const labelStyle: React.CSSProperties = {
    flex: 1, fontSize: "0.875rem", whiteSpace: "nowrap",
    transition: "all 0.2s",
    fontWeight: isActive ? 600 : 500,
    color: isActive ? "#c7d2fe" : "#9ca3af",
    opacity: isExpanded ? 1 : 0,
    transform: isExpanded ? "translateX(0)" : "translateX(-8px)",
    pointerEvents: isExpanded ? "auto" : "none",
  };

  return (
    <div>
      {hasChildren ? (
        <div style={baseStyle} onClick={() => isExpanded && setIsOpen(p => !p)}
          onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; } }}
          onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; } }}
        >
          {isActive && (
            <div style={{
              position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
              width: 3, height: "60%", background: "#818cf8", borderRadius: "0 4px 4px 0",
            }} />
          )}
          <Icon size={18} style={iconStyle} />
          <span style={labelStyle}>{item.label}</span>
          {isExpanded && (
            <ChevronRight size={14} style={{
              color: "#818cf8", flexShrink: 0,
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }} />
          )}
        </div>
      ) : (
        <Link href={item.href}>
          <div style={baseStyle}
            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; } }}
            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; } }}
          >
            {isActive && (
              <div style={{
                position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                width: 3, height: "60%", background: "#818cf8", borderRadius: "0 4px 4px 0",
              }} />
            )}
            <Icon size={18} style={iconStyle} />
            <span style={labelStyle}>{item.label}</span>
            {isExpanded && isActive && <ChevronRight size={14} style={{ color: "#818cf8", marginLeft: "auto", flexShrink: 0 }} />}
          </div>
        </Link>
      )}

      {hasChildren && isExpanded && (
        <div style={{
          overflow: "hidden", transition: "all 0.3s",
          maxHeight: isOpen ? "240px" : "0px",
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? "2px" : 0,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {item.children!.map(sub => <SubNavItem key={sub.href} item={sub} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mobile Nav Item ─────────────────────────────────────────────────
function MobileNavItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const pathname = usePathname();
  const hasChildren = !!item.children?.length;
  const isActive = pathname.startsWith(item.href);
  const [isOpen, setIsOpen] = useState(isActive && hasChildren);
  const Icon = item.icon;

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {hasChildren ? (
        <>
          <button
            onClick={() => setIsOpen(p => !p)}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "14px 16px", textAlign: "left", background: "transparent", border: "none",
              cursor: "pointer", transition: "color 0.15s",
              color: isActive ? "#a5b4fc" : "#d1d5db",
            }}
          >
            <Icon size={17} style={{ color: isActive ? "#818cf8" : "rgba(107,114,128,0.8)", flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: "0.875rem", fontWeight: 500 }}>{item.label}</span>
            <ChevronDown size={15} style={{
              color: "rgba(107,114,128,0.7)",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }} />
          </button>

          <div style={{ overflow: "hidden", maxHeight: isOpen ? "240px" : "0px", transition: "max-height 0.3s" }}>
            <div style={{ paddingBottom: "8px", display: "flex", flexDirection: "column", gap: "2px", padding: "0 8px 8px" }}>
              {item.children!.map(sub => {
                const SubIcon = sub.icon;
                const subActive = pathname === sub.href;
                return (
                  <Link key={sub.href} href={sub.href} onClick={onNavigate}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "10px 16px", borderRadius: "8px",
                      transition: "all 0.15s",
                      background: subActive ? "rgba(79,70,229,0.1)" : "transparent",
                      color: subActive ? "#a5b4fc" : "rgba(107,114,128,0.8)",
                    }}>
                      {SubIcon && <SubIcon size={14} style={{ flexShrink: 0 }} />}
                      <span style={{ fontSize: "0.875rem" }}>{sub.label}</span>
                      {subActive && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#818cf8" }} />}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <Link href={item.href} onClick={onNavigate}>
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "14px 16px", transition: "color 0.15s",
            color: isActive ? "#a5b4fc" : "#d1d5db",
          }}>
            <Icon size={17} style={{ color: isActive ? "#818cf8" : "rgba(107,114,128,0.8)", flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: "0.875rem", fontWeight: 500 }}>{item.label}</span>
            {isActive && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8" }} />}
          </div>
        </Link>
      )}
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────
export default function Sidebar() {
  const { isExpanded, setIsExpanded } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Mobile Top Bar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        display: "flex", alignItems: "center", height: "56px", padding: "0 16px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(14,9,22,0.95)", backdropFilter: "blur(20px)",
      }}
        className="md:hidden"
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            width: "30px", height: "30px",
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
          }}>
            <Sword size={15} color="#fff" strokeWidth={2.2} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.1em", color: "#fff" }}>
            CYBER ARENA
          </span>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(p => !p)}
          style={{
            marginLeft: "auto", width: "36px", height: "36px",
            borderRadius: "10px", border: "1px solid rgba(99,102,241,0.2)",
            background: "rgba(79,70,229,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#818cf8", cursor: "pointer", transition: "all 0.2s",
          }}
        >
          {mobileOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed", top: "56px", left: 0, right: 0, zIndex: 40,
          background: "rgba(14,9,22,0.98)", borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)", overflow: "hidden",
          transition: "all 0.3s ease-in-out",
          maxHeight: mobileOpen ? "100vh" : "0px",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {navItems.map(item => (
            <MobileNavItem key={item.href} item={item} onNavigate={() => setMobileOpen(false)} />
          ))}
        </nav>

        {/* Logout mobile */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px" }}>
          <form action={signOut}>
            <button type="submit" style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              fontSize: "0.875rem", color: "rgba(107,114,128,0.8)",
              background: "transparent", border: "none", cursor: "pointer",
              width: "100%", padding: "4px 0", transition: "color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(107,114,128,0.8)"; }}
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </form>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{ position: "fixed", inset: 0, zIndex: 30 }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Desktop Sidebar ── */}
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="hidden md:flex"
        style={{
          position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50,
          flexDirection: "column",
          background: "rgba(14,9,22,0.95)", borderRight: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(24px)", overflow: "hidden",
          transition: "width 0.3s ease-in-out",
          width: isExpanded ? "224px" : "64px",
        }}
      >
        {/* Sidebar ambient glow */}
        <div style={{
          position: "absolute", top: "25%", left: "-16px",
          width: "64px", height: "192px",
          background: "rgba(79,70,229,0.08)", filter: "blur(24px)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        {/* Logo */}
        <div style={{
          height: "64px", display: "flex", alignItems: "center",
          padding: "0 16px", gap: "0.75rem", overflow: "hidden", flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{
            width: "30px", height: "30px", flexShrink: 0,
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
          }}>
            <Sword size={15} color="#fff" strokeWidth={2.2} />
          </div>
          <span style={{
            fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.1em",
            color: "#fff", whiteSpace: "nowrap",
            transition: "all 0.2s",
            opacity: isExpanded ? 1 : 0,
            transform: isExpanded ? "translateX(0)" : "translateX(-8px)",
            pointerEvents: isExpanded ? "auto" : "none",
          }}>
            CYBER ARENA
          </span>
        </div>

        {/* Nav */}
        <nav style={{
          flex: 1, padding: "8px", display: "flex", flexDirection: "column",
          gap: "4px", overflowY: "auto", overflowX: "hidden",
        }}>
          {navItems.map(item => (
            <DesktopNavItem key={item.href} item={item} isExpanded={isExpanded} />
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <form action={signOut}>
            <button
              type="submit"
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "10px 12px", borderRadius: "12px",
                border: "1px solid transparent", background: "transparent",
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(239,68,68,0.08)";
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.18)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <LogOut size={18} style={{ color: "rgba(107,114,128,0.8)", flexShrink: 0 }} />
              <span style={{
                fontSize: "0.875rem", fontWeight: 500, color: "#9ca3af",
                whiteSpace: "nowrap", transition: "all 0.2s",
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? "translateX(0)" : "translateX(-8px)",
                pointerEvents: isExpanded ? "auto" : "none",
              }}>
                Sign Out
              </span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}