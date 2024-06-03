import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formateDate = (date: string) => {
  return moment(date).locale("pt").format('DD MMMM YYYY');
}

export const formateDateDetails = (date: string) => {
  return moment(date).locale("pt").format('DD/MM/YYYY');
}

export const formateYear = (date: string) => {
  return moment(date).locale("pt").format('YYYY');
}

export const formateHours = (hours: string) => {
  return moment(hours).locale("pt").format('YYYY');
}

export const formateDuration = (duration: string) => {
  let runtime = duration;
  let hora = Number(runtime) / 60;
  let minutos = Number(runtime) % 60;
  return `${Math.floor(hora)}h${minutos}m`
}