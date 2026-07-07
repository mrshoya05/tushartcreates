import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-brown-deep"
        >
          <svg
            width="160"
            height="80"
            viewBox="0 0 160 80"
            fill="none"
            className="mb-4"
          >
            <motion.path
              d="M12 55 C 30 15, 45 15, 50 40 C 54 60, 65 60, 72 30 C 78 5, 92 5, 90 35 C 88 62, 105 62, 115 35 C 122 15, 135 15, 148 45"
              stroke="#f3efe2"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-sand/70 text-xs uppercase tracking-[0.35em]"
          >
            Tushar Creates
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
