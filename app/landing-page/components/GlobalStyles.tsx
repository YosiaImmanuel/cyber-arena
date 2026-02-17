"use client";

export default function GlobalStyles() {
    return (
        <style jsx global>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --bg: #0a0a0f;
        --bg-card: #111118;
        --bg-card2: #16161f;
        --purple: #7c3aed;
        --purple-light: #9d5cf6;
        --purple-bright: #a855f7;
        --text: #fff;
        --muted: #9ca3af;
        --dim: #6b7280;
        --border: rgba(255,255,255,0.07);
      }
      html { scroll-behavior: smooth; }
      body {
        background: var(--bg);
        color: var(--text);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }
      a { text-decoration: none; color: inherit; }
      button { cursor: pointer; border: none; outline: none; }
      input { outline: none; border: none; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--purple); border-radius: 2px; }
    `}</style>
    );
}
