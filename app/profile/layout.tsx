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
          min-h-screen 
          px-6 py-6 md:p-8
          transition-all duration-300 ease-in-out
          pt-[calc(3.5rem+1rem)] md:pt-8
          ml-0 md:mt-16
          ${isExpanded ? "md:ml-56" : "md:ml-16"}
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