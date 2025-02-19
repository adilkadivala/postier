"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generateDays } from "@/lib/utils";
import { DragDrop, type Event } from "@/services/drag-drop";

interface CalendarProps {
  posts: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ posts: initialEvents }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const days = generateDays(month, year);

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const dragDrop = new DragDrop(events, setEvents, year, month);

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
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const cellDate = new Date(year, month, day);
    return cellDate < todayStart;
  };

  const getEventPosition = (event: Event, day: number) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const current = new Date(year, month, day);

    if (current.getTime() === start.getTime()) return "start";
    if (current.getTime() === end.getTime()) return "end";
    if (current > start && current < end) return "middle";
    return "single";
  };

  return (
    <div className="p-4 h-full bg-zinc-50 dark:bg-zinc-900 rounded-lg">
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

      <div className="grid grid-cols-7 gap-2">
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

        {days.map((day, index) => (
          <div
            key={index}
            onDragOver={(e) => dragDrop.handleDragOver(e)}
            onDrop={(e) => day !== null && dragDrop.handleDrop(e, day)}
            onDragEnter={(e) => dragDrop.handleDragEnter(e)}
            onDragLeave={(e) => dragDrop.handleDragLeave(e)}
            className={`dropzone p-2 h-24 text-sm border rounded-lg transition-colors overflow-hidden overflow-y-auto ${
              day
                ? isPast(day)
                  ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed text-slate-400 "
                  : isToday(day)
                  ? "bg-blue-100 text-blue-900 font-semibold dark:bg-blue-400 dark:text-blue-950"
                  : "text-gray-950 dark:text-gray-300 hover:bg-slate-200 hover:text-gray-900 dark:hover:bg-gray-600 cursor-pointer"
                : "bg-gray-400 dark:bg-gray-200 cursor-not-allowed"
            }`}
          >
            {day && (
              <>
                <div className="mb-1">{day}</div>
                <div className="flex flex-col gap-1">
                  {dragDrop.getEventsForDate(day).map((ev) => {
                    const position = getEventPosition(ev, day);
                    return (
                      <div
                        key={ev.id}
                        draggable
                        onDragStart={(e) => dragDrop.handleDragStart(e, ev)}
                        className={`p-1 px-2 text-xs rounded-sm cursor-move 
                          ${ev.color || "bg-blue-200 text-blue-800"} 
                          ${position === "start"
                            ? "rounded-l-full"
                            : position === "end"
                            ? "rounded-r-full"
                            : position === "middle"
                            ? "rounded-none"
                            : "rounded-full"
                        }`}
                      >
                        <span>{ev.title}</span>
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
