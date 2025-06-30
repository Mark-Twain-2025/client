export async function fetchAttendance(userId: number) {
  const res = await fetch(`http://localhost:3001/api/attendance/${userId}`);
  return await res.json();
}

export async function fetchQuizHis(userId: number) {
  const res = await fetch(`http://localhost:3001/api/quizHistory/${userId}`);
  return await res.json();
}

export async function fetchInvestHis(userId: number) {
  const res = await fetch(
    `http://localhost:3001/api/investments/history/${userId}`
  );
  return await res.json();
}
