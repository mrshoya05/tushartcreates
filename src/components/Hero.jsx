import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { whatsappLink } from "../data/contact";

const headline = ["Portraits", "that feel", "alive."];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const word = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-olive/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-32 h-72 w-72 rounded-full bg-sand/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold text-olive-dark mb-4"
          >
            Graphite &middot; Charcoal &middot; Pen &amp; Ink
          </motion.p>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display text-brown-deep text-[3.4rem] leading-[0.95] sm:text-7xl sm:leading-[0.95] mb-6"
          >
            {headline.map((line) => (
              <span key={line} className="block overflow-hidden">
                <motion.span variants={word} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-balance max-w-md text-brown text-base sm:text-lg mb-8"
          >
            Hi, I&apos;m Tushar Parcha — a visual artist crafting hyper-realistic
            graphite &amp; charcoal portraits, freehand sketches, and custom
            commissions, one careful line at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#gallery"
              className="rounded-full bg-brown-deep text-cream font-semibold text-sm sm:text-base px-6 py-3 hover:bg-brown transition-colors"
            >
              View Gallery
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-brown-deep text-brown-deep font-semibold text-sm sm:text-base px-6 py-3 hover:bg-brown-deep hover:text-cream transition-colors"
            >
              Commission a Piece
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-none"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-3xl bg-olive p-3 shadow-xl"
          >
            <img
              src="/images/hero-tushar.jpg"
              alt="Tushar Parcha holding one of his graphite portrait pieces"
              className="rounded-2xl w-full object-cover aspect-[3/4]"
              fetchPriority="high"
            />
          </motion.div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-brown-deep text-cream px-5 py-3 shadow-lg">
            <p className="font-display text-2xl leading-none">15+</p>
            <p className="text-[11px] uppercase tracking-wide text-sand">
              Featured Works
            </p>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-brown/70"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
