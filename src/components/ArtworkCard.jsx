import { motion } from "framer-motion";

export default function ArtworkCard({ artwork, index, onOpen }) {
  return (
    <motion.button
      type="button"
      layout
      layoutId={`card-${artwork.id}`}
      onClick={() => onOpen(artwork)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      className="group relative block w-full text-left rounded-2xl overflow-hidden bg-sand/50 shadow-sm hover:shadow-lg transition-shadow"
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
    </motion.button>
  );
}
