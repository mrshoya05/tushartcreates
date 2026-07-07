import Reveal from "./Reveal";

const SKILLS = [
  "Graphite Portraits",
  "Charcoal Work",
  "Pen Sketching",
  "Calligraphy",
  "Wall Art",
];

export default function About() {
  return (
    <section id="about" className="bg-sand/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 grid md:grid-cols-2 gap-12 items-center">
        <Reveal className="order-2 md:order-1">
          <p className="uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold text-olive-dark mb-3">
            About the artist
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-brown-deep mb-6">
            Tushar
          </h2>
          <p className="text-brown text-base sm:text-lg leading-relaxed mb-6 text-balance">
            I&apos;m Tushar Parcha, currently pursuing my bachelor&apos;s from
            DAV College, Dehradun. I&apos;m a passionate visual artist who
            loves expressing emotion and detail through graphite and charcoal
            portraits. My creative interests also extend into freehand
            sketching, elegant calligraphy, and large-scale wall art.
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="rounded-full bg-cream border border-olive/60 text-brown-deep text-xs sm:text-sm font-medium px-4 py-1.5"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="order-1 md:order-2">
          <div className="relative mx-auto max-w-sm">
            <div className="rounded-3xl overflow-hidden shadow-xl bg-olive p-3">
              <img
                src="/images/artist-portrait.jpg"
                alt="Tushar Parcha with one of his graphite portraits"
                className="rounded-2xl w-full object-cover aspect-[4/5]"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
