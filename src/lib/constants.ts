/**
 * constants.ts
 * -----------------------------------------------------------------------
 * Todas as configurações "de negócio" do site ficam centralizadas aqui,
 * para que você não precise procurar dentro dos componentes toda vez
 * que precisar trocar um número, link ou horário.
 * -----------------------------------------------------------------------
 */

/**
 * Número de WhatsApp da OrbitalNew para onde os agendamentos são enviados.
 * Formato: código do país + DDD + número, somente dígitos.
 * ⚠️ TROQUE pelo número real antes de publicar o site.
 */
export const WHATSAPP_NUMBER = "5515992477659";

/** Link do Instagram exibido no rodapé. */
export const INSTAGRAM_URL = "https://www.instagram.com/orbitanew/";

/** Vídeo de fundo do hero (efeito "boomerang" — vai e volta em loop). */
export const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4";

/**
 * Horários oferecidos para agendamento, por dia da semana.
 * Chave = Date.getDay() (0 = domingo, 1 = segunda, ..., 6 = sábado).
 *
 * Reflete os horários em que vocês ficam ocupados:
 * - Segunda, quarta e sexta: ocupados das 12:25 às 18:30 → livre de manhã (9h-12:25)
 * - Terça: ocupados das 13:15 às 18:30 → livre de manhã (9h-13:15)
 * - Quinta: ocupados das 12:25 às 17:45 → livre de manhã (9h-12:25) e à noite (18h-19h+)
 *
 * Para mudar um horário, edite a lista do dia correspondente abaixo.
 */
export const WEEKLY_AVAILABILITY: Record<number, string[]> = {
  1: ["09:00", "10:00", "11:00"], // segunda
  2: ["09:00", "10:00", "11:00", "12:00"], // terça
  3: ["09:00", "10:00", "11:00"], // quarta
  4: ["09:00", "10:00", "11:00", "18:00", "19:00"], // quinta
  5: ["09:00", "10:00", "11:00"], // sexta
};

/** Retorna os horários disponíveis para uma data específica. */
export function getTimeSlotsForDay(date: Date): string[] {
  return WEEKLY_AVAILABILITY[date.getDay()] ?? [];
}

/**
 * Intervalo mínimo entre duas solicitações de agendamento vindas do
 * mesmo navegador, para evitar cliques repetidos / spam acidental.
 * Isso roda só no navegador da pessoa (frontend) — não impede um
 * spammer decidido, mas evita o caso comum de clique duplo/repetido.
 */
export const RATE_LIMIT_MS = 3 * 60 * 1000; // 3 minutos
export const RATE_LIMIT_STORAGE_KEY = "orbitalnew:last_booking_ts";
