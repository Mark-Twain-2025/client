export async function fetchDailyRank(date: string) {
  const res = await fetch(
    `http://localhost:3001/api/ranking/daily?date=${date}`
  );
  return await res.json();
}

export async function fetchWeeklyRank(week: number) {
  const res = await fetch(
    `http://localhost:3001/api/ranking/weekly?week=${week}`
  );
  return await res.json();
}
