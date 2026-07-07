import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Mail, Plus } from "lucide-react";
import { whatsappLink, mailtoLink, telLink } from "../data/contact";

const ACTIONS = [
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle, href: whatsappLink(), external: true },
  { key: "call", label: "Call", icon: Phone, href: telLink(), external: false },
  { key: "email", label: "Email", icon: Mail, href: mailtoLink(), external: false },
];

export default function OrderFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          ACTIONS.map((action, i) => (
            <motion.a
              key={action.key}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 12, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.8 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 rounded-full bg-brown-deep text-cream shadow-lg pl-4 pr-3 py-2.5 hover:bg-accent transition-colors"
            >
              <span className="text-sm font-semibold whitespace-nowrap">
                {action.label}
              </span>
              <span className="rounded-full bg-cream/15 p-1.5">
                <action.icon size={16} />
              </span>
            </motion.a>
          ))}
      </AnimatePresence>

      <div className="relative">
        {!open && (
          <>
            <motion.span
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-accent"
            />
            <motion.span
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
              className="absolute inset-0 rounded-full bg-accent"
            />
          </>
        )}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Order options"
          whileTap={{ scale: 0.92 }}
          className="relative rounded-full bg-gradient-to-br from-accent to-brown-deep text-cream shadow-xl p-4"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="block"
          >
            <Plus size={22} />
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}
