import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ArtworkCard({ artwork, index, onOpen }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 250,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 250,
    damping: 22,
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
    <motion.button
      ref={ref}
      type="button"
      layout
      layoutId={`card-${artwork.id}`}
      onClick={() => onOpen(artwork)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="shine-sweep group relative block w-full text-left rounded-2xl overflow-hidden bg-sand/50 shadow-sm ring-1 ring-transparent hover:ring-accent/50 hover:shadow-2xl transition-shadow"
    >
      <motion.div layoutId={`image-${artwork.id}`} className="overflow-hidden">
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
          className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown-deep/90 via-brown-deep/20 to-transparent px-4 pt-10 pb-3">
        <p className="text-cream font-display text-xl leading-none tracking-wide">
          {artwork.title}
        </p>
        <p className="text-sand text-xs mt-1">{artwork.medium}</p>
      </div>
      <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
