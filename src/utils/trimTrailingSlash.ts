export function trimTrailingSlash(input: string) {
  return input.replace(/\/+$/, '');
}
