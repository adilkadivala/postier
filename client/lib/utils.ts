import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * date formating
 * Helper to format a date as "YYYY-MM-DD"
 */

export const formatDate = (
  year: number,
  month: number,
  day: number
): string => {
  const m = (month + 1).toString().padStart(2, "0");
  const d = day.toString().padStart(2, "0");
  return `${year}-${m}-${d}`;
};

/**
 * Generates an array of cells for the month.
 * Leading cells (before day 1) are represented as null.
 */
export const generateDays = (
  month: number,
  year: number
): (number | null)[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const days = Array(firstDayOfMonth).fill(null);

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
};
