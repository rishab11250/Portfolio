import { seasons } from '../data/seasons.js';

/**
 * Calendar chronological order starting Jan 1
 */
const calendarSeasons = [
  ...seasons.filter((s) => s.startMonth === 1),
  ...seasons.filter((s) => s.startMonth > 1),
].sort((a, b) => a.startMonth * 100 + a.startDay - (b.startMonth * 100 + b.startDay));

/**
 * Given a month (1..12) and day (1..31), returns the active microseason.
 */
export function getSeasonByMonthDay(month, day) {
  const key = month * 100 + day;
  let active = calendarSeasons[0];
  for (const s of calendarSeasons) {
    if (s.startMonth * 100 + s.startDay <= key) {
      active = s;
    } else {
      break;
    }
  }
  return active;
}

/**
 * Returns the current active microseason in Asia/Tokyo time so all visitors
 * observe the synchronized seasonal rhythm.
 */
export function getCurrentSeason(date = new Date()) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tokyo',
      month: 'numeric',
      day: 'numeric',
    });
    const parts = formatter.formatToParts(date);
    const month = parseInt(parts.find((p) => p.type === 'month')?.value || '1', 10);
    const day = parseInt(parts.find((p) => p.type === 'day')?.value || '1', 10);
    return getSeasonByMonthDay(month, day);
  } catch {
    // Safe fallback if Intl is unavailable or fails
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return getSeasonByMonthDay(month, day);
  }
}
