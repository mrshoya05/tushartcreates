import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import artworks from "../data/artworks.json";
import ArtworkCard from "./ArtworkCard";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

const CATEGORY_ORDER = [
  "All",
  "Graphite Portraits",
  "Pen Sketching",
  "Charcoal Work",
  "Commission Work",
];

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (category === "All") return artworks;
    return artworks.filter((a) => a.category === category);
  }, [category]);

  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="text-center mb-10 sm:mb-14">
          <p className="uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold text-olive-dark mb-3">
            The Art
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-brown-deep">
            Selected Works
          </h2>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12">
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`relative rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                category === cat
                  ? "text-cream"
                  : "text-brown hover:text-brown-deep"
              }`}
            >
              {category === cat && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full bg-brown-deep"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((artwork, i) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={i}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox artwork={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
