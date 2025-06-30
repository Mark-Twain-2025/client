const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";
export async function fetchDailyRank(date: string) {
  const res = await fetch(
   `${API_PREFIX}/ranking/daily?date=${date}`
  );
  return await res.json();
}

export async function fetchWeeklyRank(week: number) {
  const res = await fetch(
   `${API_PREFIX}/ranking/weekly?week=${week}`
  );
  return await res.json();
}
