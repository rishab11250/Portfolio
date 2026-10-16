import { seasons } from '../data/seasons.js';

/**
 * Verification script for the 72 Microseasons.
 * Iterates all 365 days of a non-leap year (e.g. 2025) and verifies:
 * 1. Exactly 72 seasons exist in data/seasons.js with IDs 1..72.
 * 2. Every single day maps to exactly one valid season.
 * 3. No gaps and no overlaps.
 * 4. Seasons 1..72 are covered in order as the calendar progresses from Risshun (Feb 4).
 */

// Days in each month for a non-leap year
const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Calendar chronological order starting Jan 1
const calendarSeasons = [
  ...seasons.filter((s) => s.startMonth === 1),
  ...seasons.filter((s) => s.startMonth > 1),
].sort((a, b) => a.startMonth * 100 + a.startDay - (b.startMonth * 100 + b.startDay));

function getSeasonForDay(month, day) {
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

function runVerification() {
  console.log('Running 72 Microseasons verification...');

  // 1. Verify 72 seasons exist with unique IDs 1..72
  if (seasons.length !== 72) {
    throw new Error(`Expected exactly 72 seasons, got ${seasons.length}`);
  }

  const ids = new Set(seasons.map((s) => s.id));
  for (let i = 1; i <= 72; i++) {
    if (!ids.has(i)) {
      throw new Error(`Missing season ID: ${i}`);
    }
  }

  // 2. Iterate all 365 days of a non-leap year
  let totalDays = 0;
  const visitedSeasons = [];
  let currentSeasonId = null;

  for (let m = 1; m <= 12; m++) {
    const daysInMonth = monthLengths[m - 1];
    for (let d = 1; d <= daysInMonth; d++) {
      totalDays++;
      const s = getSeasonForDay(m, d);
      if (!s) {
        throw new Error(`Gap found: no season mapped for ${m}/${d}`);
      }

      if (s.id !== currentSeasonId) {
        currentSeasonId = s.id;
        visitedSeasons.push({ id: s.id, name: s.name, start: `${m}/${d}` });
      }
    }
  }

  if (totalDays !== 365) {
    throw new Error(`Expected 365 days, counted ${totalDays}`);
  }

  // 3. Verify exactly 72 seasons were transitioned into throughout the year
  if (visitedSeasons.length !== 72) {
    throw new Error(`Expected 72 season transitions, got ${visitedSeasons.length}`);
  }

  // 4. Verify chronological order of seasons:
  // Starting Feb 4 (Risshun), the sequence must be 1, 2, ..., 72 in order.
  const risshunIndex = visitedSeasons.findIndex((s) => s.id === 1);
  if (risshunIndex === -1) {
    throw new Error('Season 1 (Risshun) was never visited');
  }

  // Check from Season 1 to Season 72
  for (let i = 0; i < 72; i++) {
    const expectedId = i + 1;
    const actual = visitedSeasons[(risshunIndex + i) % 72];
    if (actual.id !== expectedId) {
      throw new Error(
        `Sequence mismatch at offset ${i}: expected ID ${expectedId}, got ID ${actual.id} (${actual.name})`
      );
    }
  }

  console.log(`✓ Verified: All ${totalDays} days map to exactly 72 microseasons.`);
  console.log('✓ Verified: No gaps, no overlaps, IDs 1..72 covered in strict order.');
}

runVerification();
