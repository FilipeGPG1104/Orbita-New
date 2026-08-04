import { useEffect, useState, type FormEvent } from "react";
import { Clock, MessageCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import {
  RATE_LIMIT_MS,
  RATE_LIMIT_STORAGE_KEY,
  getTimeSlotsForDay,
  WHATSAPP_NUMBER,
} from "../lib/constants";
import { WEEKDAY_LABELS, MONTH_LABELS, formatDateLabel, getNextBusinessDays } from "../lib/dateUtils";

type Status = "idle" | "blocked" | "sent";

/** Classes compartilhadas dos botões de dia/horário: destaque com BORDA, não preenchimento total. */
function selectableClasses(active: boolean) {
  return [
    "border-2 transition-all duration-200",
    active
      ? "bg-white text-[#191919] border-[#191919] shadow-sm"
      : "bg-[#F4F3F3] text-[#191919] border-transparent hover:bg-[#eaeaea]",
  ].join(" ");
}

/**
 * Booking (#agendar)
 * -----------------------------------------------------------------------
 * Calendário de agendamento. A pessoa escolhe um dia útil e um horário
 * fixo (definidos em src/lib/constants.ts e dateUtils.ts), preenche
 * nome e WhatsApp, e ao confirmar é redirecionada para o WhatsApp da
 * OrbitaNew com uma mensagem já pronta (wa.me).
 *
 * Não existe backend: por isso o "rate limit" abaixo é só uma trava no
 * navegador da própria pessoa (via localStorage), evitando cliques
 * repetidos/spam acidental — não substitui uma proteção de servidor.
 * -----------------------------------------------------------------------
 */
export function Booking() {
  const days = getNextBusinessDays(10);
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // campo honeypot (anti-bot)
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldownLeft, setCooldownLeft] = useState(0);

  // Ao carregar, verifica se já existe um cooldown ativo de uma solicitação anterior.
  useEffect(() => {
    const last = Number(localStorage.getItem(RATE_LIMIT_STORAGE_KEY) ?? 0);
    const remaining = RATE_LIMIT_MS - (Date.now() - last);
    if (remaining > 0) setCooldownLeft(remaining);
  }, []);

  // Contador regressivo do cooldown, atualizado a cada segundo.
  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const id = setInterval(() => setCooldownLeft((v) => Math.max(0, v - 1000)), 1000);
    return () => clearInterval(id);
  }, [cooldownLeft > 0]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (website.trim() !== "") {
      // honeypot preenchido = provavelmente um bot; ignora silenciosamente
      setStatus("sent");
      return;
    }
    if (name.trim().length < 2) {
      setErrorMsg("Digite seu nome completo.");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setErrorMsg("Digite um WhatsApp válido, com DDD.");
      return;
    }
    if (!selectedTime) {
      setErrorMsg("Escolha um horário disponível.");
      return;
    }

    const last = Number(localStorage.getItem(RATE_LIMIT_STORAGE_KEY) ?? 0);
    const remaining = RATE_LIMIT_MS - (Date.now() - last);
    if (remaining > 0) {
      setCooldownLeft(remaining);
      setStatus("blocked");
      return;
    }

    const message = `Olá! Quero agendar uma reunião com a OrbitaNew.%0A%0ANome: ${encodeURIComponent(
      name
    )}%0AData: ${encodeURIComponent(formatDateLabel(selectedDay))}%0AHorário: ${encodeURIComponent(
      selectedTime
    )}`;

    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, String(Date.now()));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setStatus("sent");
    setCooldownLeft(RATE_LIMIT_MS);
  }

  const cooldownMinutes = Math.ceil(cooldownLeft / 60000);

  return (
    <section id="agendar" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6">
      <SectionHeader
        eyebrow="Agendar"
        title="Vamos conversar sobre o seu site"
        subtitle="Escolha um dia e horário. Você confirma direto pelo WhatsApp — sem burocracia, sem cadastro."
        decorative
      />

      <form
        onSubmit={handleSubmit}
        className="mt-12 sm:mt-14 max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-sm"
      >
        {/* Campo honeypot: invisível para humanos, mas bots de formulário costumam preenchê-lo */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Não preencha este campo</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <span className="text-xs font-medium text-[#191919]/60">Escolha um dia</span>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {days.map((day) => {
              const active = day.toDateString() === selectedDay.toDateString();
              return (
                <button
                  type="button"
                  key={day.toISOString()}
                  onClick={() => {
                    setSelectedDay(day);
                    setSelectedTime(null);
                  }}
                  className={`shrink-0 w-16 sm:w-[72px] rounded-lg py-3 flex flex-col items-center ${selectableClasses(active)}`}
                >
                  <span className="text-[10px] uppercase tracking-wide opacity-70">
                    {WEEKDAY_LABELS[day.getDay()]}
                  </span>
                  <span className="text-lg font-semibold mt-0.5">{day.getDate()}</span>
                  <span className="text-[10px] opacity-70">{MONTH_LABELS[day.getMonth()]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <span className="text-xs font-medium text-[#191919]/60">Escolha um horário</span>
          <div className="mt-3 grid grid-cols-4 sm:grid-cols-7 gap-2">
            {getTimeSlotsForDay(selectedDay).map((t) => {
              const active = t === selectedTime;
              return (
                <button
                  type="button"
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-1 ${selectableClasses(active)}`}
                >
                  <Clock className="w-3.5 h-3.5 opacity-60" />
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-[#191919]/60" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#191919] outline-none focus:border-[#191919]/40 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#191919]/60" htmlFor="phone">
              WhatsApp
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#191919] outline-none focus:border-[#191919]/40 transition-colors duration-200"
            />
          </div>
        </div>

        {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}

        {status === "blocked" && cooldownLeft > 0 && (
          <p className="mt-4 text-sm text-[#191919]/60">
            Você já enviou uma solicitação recentemente. Tente novamente em{" "}
            {cooldownMinutes} {cooldownMinutes === 1 ? "minuto" : "minutos"}, ou fale direto pelo{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              WhatsApp
            </a>
            .
          </p>
        )}

        {status === "sent" && (
          <p className="mt-4 text-sm text-[#191919]/70">
            Abrimos o WhatsApp com sua solicitação pronta — é só enviar a mensagem para confirmar.
          </p>
        )}

        <button
          type="submit"
          disabled={cooldownLeft > 0}
          className="mt-6 w-full px-6 py-3.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 inline-flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Confirmar no WhatsApp
        </button>

        <p className="mt-3 text-center text-xs text-[#191919]/40">
          Seus dados só são usados para essa conversa. Nada de spam.
        </p>
      </form>
    </section>
  );
}
