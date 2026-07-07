import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";
import { CONTACT, whatsappLink, mailtoLink, telLink } from "../data/contact";

const CHANNELS = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    detail: "Fastest way to reach me",
    icon: MessageCircle,
    href: whatsappLink(),
    external: true,
  },
  {
    key: "call",
    label: "Call",
    detail: CONTACT.phone,
    icon: Phone,
    href: telLink(),
    external: false,
  },
  {
    key: "email",
    label: "Email",
    detail: CONTACT.email,
    icon: Mail,
    href: mailtoLink(),
    external: false,
  },
  {
    key: "instagram",
    label: "Instagram",
    detail: CONTACT.instagramHandle,
    icon: InstagramIcon,
    href: CONTACT.instagramUrl,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-brown-deep py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold text-sand mb-3">
            Keep in touch
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-cream mb-6">
            Let&apos;s create something.
          </h2>
          <p className="text-sand/90 text-base sm:text-lg leading-relaxed mb-8 text-balance max-w-md">
            Have a photo you want turned into a hand-drawn portrait? Reach out
            on WhatsApp for the fastest reply, or use any channel below.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {CHANNELS.map((c, i) => (
              <motion.a
                key={c.key}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3, borderColor: "var(--color-accent)" }}
                className="group flex items-center gap-3 rounded-2xl bg-cream/10 hover:bg-cream/15 border border-cream/15 px-4 py-3.5 transition-colors"
              >
                <span className="rounded-full bg-cream/15 group-hover:bg-accent p-2.5 text-cream transition-colors">
                  <c.icon size={18} />
                </span>
                <span>
                  <span className="block text-cream text-sm font-semibold">
                    {c.label}
                  </span>
                  <span className="block text-sand/80 text-xs">
                    {c.detail}
                  </span>
                </span>
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/30 to-cream/10 blur-xl -z-10" />
            <ImageReveal className="rounded-3xl shadow-2xl">
              <img
                src="/images/contact-portrait.jpg"
                alt="Tushar Parcha with a finished graphite portrait, framed"
                className="w-full object-cover aspect-[3/4]"
                loading="lazy"
              />
            </ImageReveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
