import { useRef } from "react";
import { useInView } from "framer-motion";

/* ============================================================
   ANIMATION HELPERS
   ============================================================ */
export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as number[] },
    }),
};

export function useReveal(amount = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount });
    return { ref, inView };
}
