export function isEmailValid(value: string): boolean {
  return value.match(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/) !== null;
}

export function isPasswordValid(value: string): boolean {
  return value.length >= 6;
}
