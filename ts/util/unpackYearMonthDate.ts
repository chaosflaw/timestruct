export default function unpackYearMonthDate(date: Date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate()
  }
}
