export const formatDateTime = (timestamp?: null | string): string => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) return ''

  const formatted = new Intl.DateTimeFormat('nb-NO', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Oslo',
  }).format(date)

  return formatted.replace(',', ' kl.')
}
