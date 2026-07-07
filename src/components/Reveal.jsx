import { motion } from "framer-motion";

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  className = "",
  once = true,
  amount = 0.2,
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
