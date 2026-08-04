import { Logo } from "./Logo";
import type { NavLink } from "../lib/types";

const LINKS: NavLink[] = [
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Agendar", href: "#agendar" },
];

/** Barra de navegação fixa, transparente, sobre o vídeo do hero. */
export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 sm:px-10 md:px-14 py-4 sm:py-5">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo className="w-6 h-6" />
          <span className="font-semibold text-base tracking-tight text-[#191919] font-sans">
            OrbitalNew
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#191919]/70 hover:text-[#191919] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#agendar"
          className="px-5 py-2.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200"
        >
          Agendar Reunião
        </a>
      </div>
    </header>
  );
}
