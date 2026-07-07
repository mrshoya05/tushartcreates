import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { useEffect, useState } from "react";
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

const MARQUEE_ITEMS = [
  "Graphite Portraits",
  "Charcoal Studies",
  "Pen & Ink Sketches",
  "Custom Commissions",
];

function CountUp({ to = 15 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      delay: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}+</span>;
}

function TiltImage() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-none"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-3xl bg-gradient-to-br from-olive to-olive-dark p-3 shadow-2xl"
      >
        <img
          src="/images/hero-tushar.jpg"
          alt="Tushar Parcha holding one of his graphite portrait pieces"
          className="rounded-2xl w-full object-cover aspect-[3/4] pointer-events-none"
          fetchPriority="high"
          style={{ transform: "translateZ(30px)" }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute -bottom-5 -left-5 rounded-2xl bg-brown-deep text-cream px-5 py-3 shadow-lg"
      >
        <p className="font-display text-2xl leading-none text-accent-soft">
          <CountUp to={15} />
        </p>
        <p className="text-[11px] uppercase tracking-wide text-sand">
          Featured Works
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pt-28 pb-0 sm:pt-36"
    >
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-olive/40 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 -left-32 h-72 w-72 rounded-full bg-sand/60 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 grid md:grid-cols-2 gap-12 md:gap-8 items-center pb-16 sm:pb-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold text-accent mb-4"
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
            <motion.a
              href="#gallery"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="shine-sweep rounded-full bg-brown-deep text-cream font-semibold text-sm sm:text-base px-6 py-3 hover:bg-brown transition-colors"
            >
              View Gallery
            </motion.a>
            <motion.a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border-2 border-accent text-accent font-semibold text-sm sm:text-base px-6 py-3 hover:bg-accent hover:text-cream transition-colors"
            >
              Commission a Piece
            </motion.a>
          </motion.div>
        </div>

        <TiltImage />
      </div>

      <div className="relative border-y border-brown-deep/10 bg-brown-deep py-3 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-8"
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 text-sand/80 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold"
            >
              {item}
              <span className="text-accent">&#9670;</span>
            </span>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="hidden sm:flex absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-brown/70 z-10"
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
