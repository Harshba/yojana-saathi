/** Build a URL for a file in Vite's public directory, including the Pages base path. */
export function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
