/**
 * dateUtils.ts
 * -----------------------------------------------------------------------
 * Funções auxiliares de data usadas pelo calendário de agendamento.
 * -----------------------------------------------------------------------
 */

export const WEEKDAY_LABELS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
export const MONTH_LABELS = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

export const MONTH_LABELS_FULL = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Retorna os dias úteis (seg–sex) de um mês a partir de uma data mínima. */
function getBusinessDaysInMonth(year: number, month: number, minDate: Date): Date[] {
  const days: Date[] = [];
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    const date = startOfDay(new Date(year, month, day));
    const weekday = date.getDay();
    if (weekday !== 0 && weekday !== 6 && date >= minDate) {
      days.push(date);
    }
  }

  return days;
}

/**
 * Retorna todos os dias úteis disponíveis no mês corrente (a partir de amanhã).
 * Se não restar nenhum dia útil no mês atual, avança automaticamente para o próximo.
 */
export function getAvailableDaysInMonth(now: Date = new Date()): Date[] {
  const today = startOfDay(now);
  const tomorrow = startOfDay(new Date(today));
  tomorrow.setDate(tomorrow.getDate() + 1);

  const year = today.getFullYear();
  const month = today.getMonth();
  const days = getBusinessDaysInMonth(year, month, tomorrow);

  if (days.length > 0) return days;

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  return getBusinessDaysInMonth(nextYear, nextMonth, startOfDay(new Date(nextYear, nextMonth, 1)));
}

/**
 * Retorna os próximos `count` dias úteis (segunda a sexta), começando
 * a partir de amanhã. Sábados e domingos são pulados automaticamente.
 */
export function getNextBusinessDays(count: number): Date[] {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1); // começa amanhã

  while (days.length < count) {
    const weekday = cursor.getDay(); // 0 = domingo, 6 = sábado
    if (weekday !== 0 && weekday !== 6) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

/** Formata mês e ano, ex.: "agosto 2026". */
export function formatMonthYear(date: Date): string {
  return `${MONTH_LABELS_FULL[date.getMonth()]} ${date.getFullYear()}`;
}

/** Formata uma data como "seg, 12 de ago" para exibir/enviar no WhatsApp. */
export function formatDateLabel(date: Date): string {
  return `${WEEKDAY_LABELS[date.getDay()]}, ${date.getDate()} de ${
    MONTH_LABELS[date.getMonth()]
  }`;
}
