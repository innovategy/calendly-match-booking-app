// MatchFinder: Compares user slots with Calendly availability
// Input: userSlots: string[], calendlySlots: string[] (ISODateTime)
// Output: first matching slot or null
// Robust match: compare local date and time (YYYY-MM-DDTHH:mm), ignore seconds/ms/timezone
export function findFirstMatch(userSlots: string[], calendlySlots: string[]): string | null {
  // Helper to normalize ISO string to 'YYYY-MM-DDTHH:mm' in local time
  function normalizeToLocalYMDHM(iso: string) {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }
  const normalizedUser = userSlots.map(normalizeToLocalYMDHM);
  const normalizedCalendly = calendlySlots.map(normalizeToLocalYMDHM);
  for (let i = 0; i < userSlots.length; ++i) {
    const idx = normalizedCalendly.indexOf(normalizedUser[i]);
    if (idx !== -1) {
      return calendlySlots[idx]; // Return the Calendly slot (preserving its timezone)
    }
  }
  return null;
}

