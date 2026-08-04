import { Building2, Layers, LayoutTemplate, Wrench, type LucideIcon } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: LayoutTemplate,
    title: "Landing Pages",
    desc: "Páginas de alta conversão para captar leads, vender um produto ou lançar uma campanha rápido.",
  },
  {
    icon: Building2,
    title: "Sites institucionais",
    desc: "Presença profissional para sua marca, com identidade visual própria e boas práticas de SEO.",
  },
  {
    icon: Layers,
    title: "SaaS & Produtos digitais",
    desc: "Plataformas sob medida: login, painéis, pagamentos e automações para o seu produto crescer.",
  },
  {
    icon: Wrench,
    title: "Manutenção & Suporte",
    desc: "Seu site continua no ar, atualizado e seguro — sem você precisar aprender a programar.",
  },
];

/** Seção "O que construímos para você" (#servicos): grade de cards de serviço. */
export function Services() {
  return (
    <section id="servicos" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6">
      <SectionHeader
        eyebrow="Serviços"
        title="O que construímos para você"
        subtitle="Cada negócio precisa de algo diferente. A gente ajuda a escolher o formato certo e entrega pronto para usar."
        decorative
      />

      <div className="mt-14 sm:mt-16 max-w-5xl mx-auto grid sm:grid-cols-2 gap-4 sm:gap-5">
        {SERVICES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-[#F4F3F3] hover:bg-[#eaeaea] transition-all duration-200 rounded-lg p-6 sm:p-8"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#191919]" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#191919]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#191919]/70 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
