
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";
export async function fetchInvest(userId: number, date: string) {
  const res = await fetch(`${API_PREFIX}/investments/${userId}?date=${date}`);
  return await res.json();
}
