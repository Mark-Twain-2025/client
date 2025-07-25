const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";

export async function fetchUserCoins(userId: string): Promise<number> {
  const res = await fetch(`${API_PREFIX}/user_info/${userId}`);
  if (!res.ok) throw new Error("유저 정보 조회 실패");
  const data = await res.json();
  return data.coins;
}

export async function voteBefore({ userId, category_id, amount, date }: { userId: string, category_id: string, amount: number, date: string }): Promise<{ coins: number }> {
  const res = await fetch(`${API_PREFIX}/vote_before/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category_id, amount, date }),
  });
  if (!res.ok) throw new Error("투표 실패");
  const data = await res.json();
  return { coins: data.coins };
}

// 오늘자 투표 내역 조회
export async function getTodayVoteBefore(userId: string, date: string): Promise<any> {
  const res = await fetch(`${API_PREFIX}/vote_before/${userId}?date=${date}`);
  if (!res.ok) throw new Error("투표 내역 조회 실패");
  const data = await res.json();
  return data && data.length > 0 ? data[0] : null;
}

// 카테고리만 수정 (PATCH) - investments도 함께 업데이트
export async function patchVoteBeforeCategory(voteId: string, category_id: string): Promise<any> {
  const res = await fetch(`${API_PREFIX}/vote_before/${voteId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category_id }),
  });
  if (!res.ok) throw new Error("투표 수정 실패");
  return await res.json();
}

// investments 카테고리 업데이트 함수 추가
export async function updateInvestmentCategory(userId: string, date: string, category_id: string): Promise<any> {
  const res = await fetch(`${API_PREFIX}/investments/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, category_id }),
  });
  if (!res.ok) throw new Error("투자 정보 수정 실패");
  return await res.json();
}

// 오늘자 VoteAfter 투표 내역 조회
export async function getTodayVoteAfter(userId: string, date: string): Promise<any> {
  const res = await fetch(`${API_PREFIX}/vote_after/${userId}?date=${date}`);
  if (!res.ok) throw new Error("투표 내역 조회 실패");
  const data = await res.json();
  return data && data.length > 0 ? data[0] : null;
}

// VoteAfter 투표 POST
export async function voteAfter({ userId, category_id, date }: { userId: string, category_id: string, date: string }): Promise<any> {
  const res = await fetch(`${API_PREFIX}/vote_after/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category_id, date }),
  });
  if (!res.ok) throw new Error("투표 실패");
  return await res.json();
}
