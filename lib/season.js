/**
 * 4 Seasons helper: Spring, Summer, Autumn, Winter
 */
export const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

export function getCurrentSeason(date = new Date()) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tokyo',
      month: 'numeric',
    });
    const parts = formatter.formatToParts(date);
    const month = parseInt(parts.find((p) => p.type === 'month')?.value || '1', 10);
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter';
  } catch {
    const month = date.getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter';
  }
}
