export function getTimeFormat(time: string, date: Date) {
  const [hours, minutes] = time.split(":");
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return date.getTime();
}

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDateTime;
}

export function formatISO(isoString: string) {
  //ISO转北京时间
  const utcDate = new Date(isoString);
  const offsetInMinutes = -480; // 北京时间是 UTC+8，即 8 小时，乘以 -60 得到分钟
  const beijingTime = new Date(utcDate.getTime() + offsetInMinutes * 60 * 1000);
  // 格式化日期和时间
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  });
  return formatter.format(beijingTime);
}
