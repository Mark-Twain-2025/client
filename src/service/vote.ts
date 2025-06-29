const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";

export async function fetchUserCoins(userId: string): Promise<number> {
  const res = await fetch(`${API_PREFIX}/user_info/${userId}`);
  if (!res.ok) throw new Error("유저 정보 조회 실패");
  const data = await res.json();
  return data.coins;
}
