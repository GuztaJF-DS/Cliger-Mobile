export default function MonthFilter(month, year, onlySunday) {
  let days = new Array(new Date(year, month + 1, 0).getDate())
    .fill()
    .map((n, i) => {
      const weekDay = new Date(year, month, ++i).getDay();
      if (onlySunday == true) {
        return weekDay > 0 && i;
      } else {
        return weekDay > 0 && weekDay < 6 && i;
      }
    })
    .filter(val => !!val);
  return days.length;
}
