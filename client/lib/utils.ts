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
 * Formats a date with time as "YYYY-MM-DDTHH:MM:SS"
 */
export const formatDateWithTime = (
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0
): string => {
  const dateStr = formatDate(year, month, day);
  const h = hour.toString().padStart(2, "0");
  const m = minute.toString().padStart(2, "0");
  return `${dateStr}T${h}:${m}:00`;
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

/**
 * Get the week number for a given date
 */
export const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

/**
 * Get a color based on event category or ID for consistent coloring
 */
export const getEventColor = (event: {
  id: string;
  category?: string;
}): string => {
  const colorOptions = [
    "bg-blue-200 text-blue-800",
    "bg-green-200 text-green-800",
    "bg-yellow-200 text-yellow-800",
    "bg-red-200 text-red-800",
    "bg-purple-200 text-purple-800",
    "bg-pink-200 text-pink-800",
    "bg-indigo-200 text-indigo-800",
  ];

  // Use category if available, otherwise use ID
  const seed = event.category || event.id;
  const index =
    Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colorOptions.length;

  return colorOptions[index];
};
