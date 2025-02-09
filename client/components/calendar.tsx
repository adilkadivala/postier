"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Helper to format a date as "YYYY-MM-DD"
 */
const formatDate = (year: number, month: number, day: number): string => {
  const m = (month + 1).toString().padStart(2, "0");
  const d = day.toString().padStart(2, "0");
  return `${year}-${m}-${d}`;
};

/**
 * Generates an array of cells for the month.
 * Leading cells (before day 1) are represented as null.
 */
const generateDays = (month: number, year: number): (number | null)[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const days = Array(firstDayOfMonth).fill(null);

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
};

interface Event {
  id: string;
  title: string;
  date: string;
  color?: string;
}

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events: initialEvents }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);
  const dragCounter = useRef(0);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const days = generateDays(month, year);

  // Update events if the parent prop changes.
  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  /**
   * Returns events for the given day.
   */
  const getEventsForDate = (day: number | null) => {
    if (day === null) return [];
    const dateStr = formatDate(year, month, day);
    return events.filter((ev) => ev.date === dateStr);
  };

  // Called when a drag operation starts.
  const handleDragStart = (e: React.DragEvent, event: Event) => {
    setDraggedEvent(event);
    e.dataTransfer.setData("text/plain", event.id);
    e.dataTransfer.effectAllowed = "move";
  };

  // Allow drop by preventing default.
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  /**
   * Clears highlight class ("bg-gray-200") from all dropzone cells.
   */
  const clearHighlights = () => {
    const dropzones = document.querySelectorAll(".dropzone");
    dropzones.forEach((zone) => zone.classList.remove("bg-gray-200"));
    dragCounter.current = 0;
  };

  /**
   * Handles the drop of a dragged event onto a day cell.
   * If the drop target is in the past (relative to today's date), the drop is ignored.
   * Also clears any highlight classes.
   */
  const handleDrop = (e: React.DragEvent, day: number) => {
    e.preventDefault();
    // Clear highlight from all dropzones.
    clearHighlights();

    if (draggedEvent) {
      const dropDateStr = formatDate(year, month, day);
      const dropDate = new Date(year, month, day);
      // Get today's date at midnight.
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Prevent dropping on a past date.
      if (dropDate < today) {
        setDraggedEvent(null);
        return;
      }

      // Update the event's date.
      const updatedEvents = events.map((ev) =>
        ev.id === draggedEvent.id ? { ...ev, date: dropDateStr } : ev
      );
      setEvents(updatedEvents);
      setDraggedEvent(null);
    }
  };

  // Add highlight when dragging enters a cell.
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    e.currentTarget.classList.add("bg-gray-200");
  };

  // Remove highlight when dragging leaves a cell.
  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      e.currentTarget.classList.remove("bg-gray-200");
    }
  };

  // Helper: Check if the day is today.
  const isToday = (day: number) => {
    const now = new Date();
    return (
      day === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const today = new Date();
    // Normalize today's date to midnight.
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const cellDate = new Date(year, month, day);
    return cellDate < todayStart;
  };

  return (
    <div className="p-4 h-full bg-zinc-50 dark:bg-zinc-900 rounded-lg">
      {/* Header with month navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <ChevronLeft />
        </button>
        <h3 className="text-2xl font-bold text-zinc-600 dark:text-slate-200">
          {currentDate.toLocaleString("default", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (dayName, index) => (
            <div
              key={index}
              className="text-center font-medium text-gray-500 py-2"
            >
              {dayName}
            </div>
          )
        )}

        {/* Calendar day cells */}
        {days.map((day, index) => (
          <div
            key={index}
            onDragOver={handleDragOver}
            onDrop={(e) => day !== null && handleDrop(e, day)}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`dropzone p-2 h-24 text-sm border rounded-lg transition-colors overflow-hidden overflow-y-auto ${
              day
                ? isPast(day)
                  ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed text-slate-400 "
                  : isToday(day)
                  ? "bg-blue-100 text-blue-800 font-semibold dark:bg-blue-400 dark:text-blue-950"
                  : "text-gray-500 dark:text-gray-300 hover:bg-slate-200 hover:text-gray-900 dark:hover:bg-gray-600 cursor-pointer"
                : "bg-gray-400 dark:bg-gray-200 cursor-not-allowed"
            }`}
          >
            {day && (
              <>
                <div className="font-semibold mb-1">{day}</div>
                <div className="flex items-center gap-1 flex-wrap">
                  {getEventsForDate(day).map((ev) => {
                    const event =
                      ev.title?.length <= 5 ? ev.title : ev.title.charAt(0);
                    return (
                      <div
                        key={ev.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, ev)}
                        className={`p-1 px-2 text-xs rounded-full cursor-move w-fit ${
                          ev.color ? ev.color : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        <span>{event}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
