interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Mostra um anel decorativo sutil atrás do título (usado com moderação). */
  decorative?: boolean;
}

/** Cabeçalho padrão (etiqueta + título serif + subtítulo) usado em todas as seções. */
export function SectionHeader({ eyebrow, title, subtitle, decorative = false }: SectionHeaderProps) {
  return (
    <div className="relative max-w-2xl mx-auto text-center px-4">
      {decorative && (
        <svg
          viewBox="0 0 400 200"
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[420px] h-[220px] text-[#191919]/[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <ellipse
            cx="200"
            cy="100"
            rx="190"
            ry="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(-8 200 100)"
          />
        </svg>
      )}
      <span className="relative text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
        {eyebrow}
      </span>
      <h2 className="relative mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight text-[#191919]">
        {title}
      </h2>
      {subtitle && (
        <p className="relative mt-4 text-sm md:text-base text-[#191919]/70 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
