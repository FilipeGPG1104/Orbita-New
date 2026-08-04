import { Check } from "lucide-react";

const POINTS = [
  "Reunião de descoberta sem compromisso",
  "Protótipo antes de qualquer cobrança fechada",
  "Você acompanha o projeto do início ao ar",
];

/** Seção "Sobre a OrbitalNew" (#sobre). */
export function About() {
  return (
    <section id="sobre" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
            Sobre a OrbitalNew
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-normal leading-tight tracking-tight text-[#191919]">
            Feito para quem está começando a crescer.
          </h2>
          <p className="mt-5 text-sm md:text-base text-[#191919]/70 leading-relaxed">
            A OrbitalNew nasceu para atender microempreendedores que
            precisam de um site sério, sem o preço nem a burocracia de uma
            agência grande. Falamos a sua língua e entregamos no seu prazo.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {POINTS.map((p) => (
            <div key={p} className="flex items-start gap-3 bg-[#F4F3F3] rounded-lg px-5 py-4">
              <Check className="w-4 h-4 text-[#191919] mt-0.5 shrink-0" />
              <span className="text-sm text-[#191919]/80">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
