/** throw an error */
export function error(message: string): never {
  throw new Error(`[hexchess error] ${message}`)
}
