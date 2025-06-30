const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";
export async function fetchAttendance(userId: number) {
  const res = await fetch(`${API_PREFIX}/attendance/${userId}`);
  return await res.json();
}

export async function fetchQuizHis(userId: number) {
  const res = await fetch(`${API_PREFIX}/quizHistory/${userId}`);
  return await res.json();
}

export async function fetchInvestHis(userId: number) {
  const res = await fetch(`${API_PREFIX}/investments/history/${userId}`);
  return await res.json();
}
