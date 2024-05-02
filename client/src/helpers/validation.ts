export function isEmailValid(value: string): string {
  const isValid = value.match(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/) !== null;

  if (!isValid) {
    return 'email not valid';
  }

  return '';
}

export function isPasswordValid(value: string): string {
  const isValid = value.length >= 6;

  if (!isValid) {
    return 'password not long enough';
  }

  return '';
}
