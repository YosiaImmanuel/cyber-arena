// app/(protected)/layout.tsx
"use client";

import { SidebarProvider, useSidebar } from "@/layout/sidebarProvider"
import Sidebar from "@/layout/sidebar";
import Header from "@/layout/header"

// Pisah komponen inner agar bisa akses useSidebar
function LayoutInner({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar()

  return (
    <>
      <Sidebar />
      <Header />
      <main
        className={`
          mt-16 min-h-screen bg-[#0e0916] p-8
          transition-all duration-300 ease-in-out
          ${isExpanded ? "ml-56" : "ml-16"}
        `}
      >
        {children}
      </main>
    </>
  )
}

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutInner>{children}</LayoutInner>
    </SidebarProvider>
  )
}