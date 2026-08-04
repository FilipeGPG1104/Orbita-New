import { ArrowRight } from "lucide-react";
import { BoomerangVideoBg } from "./BoomerangVideoBg";

const QUICK_LINKS = [
  { label: "Portfólio", desc: "Veja nossos projetos", href: "#portfolio" },
  { label: "Serviços", desc: "Landing pages, sites e SaaS", href: "#servicos" },
  { label: "Agendar", desc: "Marque uma conversa", href: "#agendar" },
];

/**
 * Hero
 * -----------------------------------------------------------------------
 * Primeira dobra da página (100vh): vídeo de fundo + headline + CTA,
 * com um painel branco "vidro" (glassmorphism) colado na base da tela
 * resumindo o que a empresa faz e dando acesso rápido às outras seções.
 * -----------------------------------------------------------------------
 */
export function Hero() {
  return (
    <section id="top" className="relative flex flex-col items-center overflow-hidden h-screen">
      <BoomerangVideoBg />

      <div className="relative z-10 flex flex-col items-center pt-24 sm:pt-26 md:pt-32 px-4 sm:px-6 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter text-[#191919] font-normal">
          Seu negócio
          <br />
          em órbita.
        </h1>
        <p className="max-w-sm sm:max-w-md mt-5 sm:mt-6 md:mt-8 text-sm md:text-base text-[#191919]/70 leading-relaxed">
          Criamos sites, landing pages e plataformas sob medida para
          microempreendedores que querem vender mais e parecer maiores do
          que são.
        </p>
        <a
          href="#agendar"
          className="mt-6 sm:mt-8 md:mt-10 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200 inline-flex items-center gap-2"
        >
          Agendar uma reunião
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="relative z-10 mt-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 border-b-0 pt-8 sm:pt-12 md:pt-16 px-5 sm:px-8 md:px-12 pb-0 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-16">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                O que fazemos?
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif font-normal leading-tight tracking-tight text-[#191919]">
                Sites que vendem,
                <br className="hidden sm:block" /> não só existem.
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed">
                Da primeira landing page ao seu SaaS completo — cuidamos do
                design, do código e da hospedagem para que você foque em
                atender quem já é seu cliente.
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10 h-px bg-gray-200 w-full" />

          <div className="grid sm:grid-cols-3 gap-2 sm:gap-3 py-4 sm:py-5">
            {QUICK_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group bg-[#F4F3F3] hover:bg-[#eaeaea] transition-all duration-200 cursor-pointer px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between rounded-md"
              >
                <span>
                  <span className="font-medium text-[#191919] text-sm">{item.label}</span>
                  <span className="block text-xs text-[#191919]/50 mt-0.5">{item.desc}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
