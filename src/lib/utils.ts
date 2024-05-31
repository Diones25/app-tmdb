import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formateDate = (date: string) => {
  return moment(date).locale("pt").format('DD MMMM YYYY');
}