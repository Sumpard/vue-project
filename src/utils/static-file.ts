export function sf(suffix: string) {
  return import.meta.env.VITE_STATIC_URL + suffix;
}
