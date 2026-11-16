const formatter = new Intl.DateTimeFormat('uk-UA', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

const fullFormatter = new Intl.DateTimeFormat('uk-UA', {
  dateStyle: 'long',
  timeStyle: 'long',
});

export function formatTime(timestamp) {
  return formatter.format(timestamp);
}

export function formatDateTime(timestamp) {
  return fullFormatter.format(timestamp);
}
