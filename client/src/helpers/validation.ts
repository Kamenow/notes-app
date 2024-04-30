export function isEmailValid(value: string): boolean {
  // TODO: discuss we would need a library for email validation or a different regex
  return value.match(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/) !== null;
}

export function isPasswordValid(value: string): boolean {
  // TODO: discuss we would need a library for email validation or a different regex
  return value.length >= 6;
}
