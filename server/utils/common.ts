export function getCurrentFullYear() {
  return new Date().getFullYear();
}

export function trimAndClean(val: string) {
  return val.trim().replace(/\s+/g, " ");
}