import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-brown-deep to-[#241b14] overflow-hidden py-10">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-sand/80 italic text-sm sm:text-base max-w-md text-balance">
          &ldquo;Art washes away from the soul the dust of everyday
          life.&rdquo;
        </p>
        <p className="text-sand/50 text-xs mt-1">— Pablo Picasso</p>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-sand/50">
          <p>&copy; {new Date().getFullYear()} Tushar Parcha — Tushar Creates</p>
          <Link to="/admin" className="hover:text-sand transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
