import { motion } from "framer-motion";

export default function ImageReveal({ children, className = "", delay = 0 }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-gradient-to-r from-accent to-brown-deep z-10"
      />
    </div>
  );
}
