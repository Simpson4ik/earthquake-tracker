const formatter = new Intl.DateTimeFormat('uk-UA', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatTime(timestamp) {
  return formatter.format(timestamp);
}
