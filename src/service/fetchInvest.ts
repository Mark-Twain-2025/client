export async function fetchInvest(userId: number) {
  const res = await fetch(`http://localhost:3001/investments/${date}`);
  return await res.json();
}
