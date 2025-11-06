export function pad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function format(date, pattern = 'yyyy-MM-dd') {
  const d = toDate(date);
  const map = {
    yyyy: d.getFullYear(),
    MM: pad(d.getMonth() + 1),
    dd: pad(d.getDate()),
    HH: pad(d.getHours()),
    mm: pad(d.getMinutes()),
  };
  if (pattern === 'MMM yyyy') {
    return monthShortName(d.getMonth()) + ' ' + d.getFullYear();
  }
  return pattern.replace(/yyyy|MM|dd|HH|mm/g, (m) => map[m]);
}

function monthShortName(idx) {
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][idx];
}

export function toDate(value) {
  return value instanceof Date ? value : new Date(value);
}

export function startOfMonth(date) {
  const d = toDate(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function endOfMonth(date) {
  const d = toDate(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function addMonths(date, count) {
  const d = toDate(date);
  const newDate = new Date(d);
  newDate.setMonth(newDate.getMonth() + count);
  return newDate;
}

export function subDays(date, count) {
  const d = toDate(date);
  const newDate = new Date(d);
  newDate.setDate(newDate.getDate() - count);
  return newDate;
}

export function isWithinInterval(date, { start, end }) {
  const d = toDate(date).getTime();
  return d >= toDate(start).getTime() && d <= toDate(end).getTime();
}
