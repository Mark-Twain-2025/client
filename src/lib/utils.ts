export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function getUserLunch() {
  return Number(localStorage.getItem('userLunch') || '0');
}

export function setUserLunch(amount: number) {
  localStorage.setItem('userLunch', String(amount));
  window.dispatchEvent(new Event('userLunchChanged'));
}

export function addUserLunch(amount: number) {
  setUserLunch(getUserLunch() + amount);
}
