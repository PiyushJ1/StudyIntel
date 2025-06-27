export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;

  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegEx.test(email);
}
