import dayjs from "dayjs";

export function combineDateTime(time: string, date: Date) {
  const [hours, minutes] = time.split(":");
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return date.getTime();
}

export function formatTimestamp(timestamp: number) {
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm");
}
