export function formatTime(totalSeconds: number): string {
  const min = Math.floor(totalSeconds / 60)
  const sec = totalSeconds % 60

  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}
