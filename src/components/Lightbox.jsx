import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { whatsappLink } from "../data/contact";

export default function Lightbox({ artwork, onClose }) {
  useEffect(() => {
    if (!artwork) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [artwork, onClose]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-brown-deep/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          <motion.div
            layoutId={`card-${artwork.id}`}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto bg-cream rounded-t-3xl sm:rounded-3xl shadow-2xl grid sm:grid-cols-2"
          >
            <motion.div layoutId={`image-${artwork.id}`} className="bg-olive">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full max-h-[50vh] sm:max-h-[92vh] object-cover"
              />
            </motion.div>

            <div className="p-6 sm:p-8 flex flex-col">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 rounded-full bg-brown-deep/90 text-cream p-2 hover:bg-brown transition-colors"
              >
                <X size={18} />
              </button>

              <p className="uppercase tracking-[0.2em] text-xs font-semibold text-accent mb-2">
                {artwork.category}
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-brown-deep mb-2">
                {artwork.title}
              </h3>
              <p className="text-sm text-brown/70 mb-4">{artwork.medium}</p>
              <p className="text-brown text-sm sm:text-base leading-relaxed mb-8 flex-1">
                {artwork.description}
              </p>

              <motion.a
                href={whatsappLink(
                  `Hi Tushar, I'm interested in a piece like "${artwork.title}" — could we talk about a commission?`
                )}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="shine-sweep inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-brown-deep text-cream font-semibold text-sm sm:text-base px-6 py-3 transition-colors"
              >
                <MessageCircle size={18} />
                Order a piece like this
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
