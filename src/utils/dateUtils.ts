import { format, parseISO, isBefore, isAfter } from "date-fns";


export const formatDate = (date: string | Date, formatStr = "dd/MM/yyyy") => {
  return format(typeof date === "string" ? parseISO(date) : date, formatStr);
};


export const isDateBefore = (date1: string | Date, date2: string | Date) => {
  return isBefore(new Date(date1), new Date(date2));
};


export const isDateAfter = (date1: string | Date, date2: string | Date) => {
  return isAfter(new Date(date1), new Date(date2));
};


export const filterByMonth = (items: any[], month: number, year: number) => {
  return items.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getMonth() === month - 1 && itemDate.getFullYear() === year
    );
}
)};


export const filterByYear = (items: any[], year: number) => {
  return items.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate.getFullYear() === year;
  });
};
