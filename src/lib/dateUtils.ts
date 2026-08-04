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

/** Formata uma data como "seg, 12 de ago" para exibir/enviar no WhatsApp. */
export function formatDateLabel(date: Date): string {
  return `${WEEKDAY_LABELS[date.getDay()]}, ${date.getDate()} de ${
    MONTH_LABELS[date.getMonth()]
  }`;
}
