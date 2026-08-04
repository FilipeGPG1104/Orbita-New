import { ArrowUpRight, Instagram } from "lucide-react";
import logoFull from "../assets/logo-full.png";
import { INSTAGRAM_URL } from "../lib/constants";
import type { NavLink } from "../lib/types";

const NAV_LINKS: NavLink[] = [
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Agendar", href: "#agendar" },
];

/** Rodapé: logo, link do Instagram e navegação rápida. */
export function Footer() {
  return (
    <footer className="relative border-t border-gray-200 px-6 sm:px-10 md:px-14 pt-14 pb-8">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-10 sm:gap-6">
        <div>
          <img src={logoFull} alt="OrbitalNew" className="h-7 w-auto object-contain" />
          <p className="mt-4 max-w-xs text-sm text-[#191919]/60 leading-relaxed">
            Sites que colocam seu negócio em órbita.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-[#191919]/70 hover:text-[#191919] transition-colors duration-200"
          >
            <Instagram className="w-4 h-4" />
            @orbitanew
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex sm:justify-end">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/40 font-medium">
              Navegação
            </span>
            <ul className="mt-3 flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-[#191919]/70 hover:text-[#191919] transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-[#191919]/40">
          © {new Date().getFullYear()} OrbitalNew. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}
