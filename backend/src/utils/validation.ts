export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;

  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegEx.test(email);
}

export function validatePassword(password: string): boolean {
  // password length is less than 9 characters
  if (password.length < 9) return false;

  // no whitespace
  if (/\s/.test(password)) return false;

  // regex to ensure password contains at least 9 chars, at least 1 uppercase,
  // 1 lowercase, 1 digit, and 1 special character
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-\\/]).{9,}$/;
  if (!passwordRegEx.test(password)) return false;

  return true;
}