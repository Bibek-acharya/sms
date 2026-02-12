
// Basic AD to BS conversion logic for Nepali Calendar
// Focused on 2082-2083 BS (2025-2026 AD) for school ERP context

export const nepaliMonths = [
  "Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
];

const bsData: Record<number, number[]> = {
  82: [31, 31, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // BS 2082
  83: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], // BS 2083
};

/**
 * Simplified AD to BS converter for Feb 2026
 * 2026-02-01 is 2082-Magh-19 (approx)
 */
export function getNepaliDate(day: number, month: number, year: number) {
  // Hardcoded for Feb 2026 for now to match UI state
  if (year === 2026 && month === 2) {
    const maghRemaining = 29 - 19; // 10 days left in Magh
    if (day <= (maghRemaining + 1)) {
        return { day: 18 + day, month: "Magh", year: 2082 };
    } else {
        return { day: day - (maghRemaining + 1), month: "Falgun", year: 2082 };
    }
  }
  return null;
}

export function toNepaliNumeral(num: number | string): string {
  const numerals: Record<string, string> = {
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
  };
  return num.toString().split('').map(char => numerals[char] || char).join('');
}
