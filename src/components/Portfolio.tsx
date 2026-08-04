import { SectionHeader } from "./SectionHeader";
import { Logo } from "./Logo";

/**
 * Portfolio (#portfolio)
 * -----------------------------------------------------------------------
 * Seção reservada para os cases da empresa. Por enquanto mostra cards
 * "Em breve" — quando houver projetos reais, troque o array
 * PLACEHOLDER_COUNT por um array de projetos (nome, imagem, link) e
 * renderize cards reais no lugar dos placeholders tracejados.
 * -----------------------------------------------------------------------
 */
const PLACEHOLDER_COUNT = 3;

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-[#F4F3F3]/50">
      <SectionHeader
        eyebrow="Portfólio"
        title="Projetos em órbita"
        subtitle="Estamos organizando os primeiros cases para mostrar aqui. Em breve você vai ver, na prática, o que construímos para outros microempreendedores."
      />

      <div className="mt-14 sm:mt-16 max-w-5xl mx-auto grid sm:grid-cols-3 gap-4 sm:gap-5">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 bg-white/60"
          >
            <Logo className="w-7 h-7 opacity-20" />
            <span className="text-xs uppercase tracking-[0.15em] text-[#191919]/40 font-medium">
              Em breve
            </span>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[#191919]/50">
        Quer ser um dos primeiros cases?{" "}
        <a href="#agendar" className="text-[#191919] underline underline-offset-2">
          Fale com a gente
        </a>
        .
      </p>
    </section>
  );
}
