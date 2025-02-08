"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useState, useRef, useEffect } from "react";

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

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const getEventsForDate = (day: number | null) => {
    if (day === null) return [];
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  const handleDragStart = (e: React.DragEvent, event: Event) => {
    setDraggedEvent(event);
    e.dataTransfer.setData("text/plain", event.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, day: number) => {
    e.preventDefault();
    if (draggedEvent) {
      const updatedEvents = events.map((event) =>
        event.id === draggedEvent.id
          ? {
              ...event,
              date: new Date(year, month, day).toISOString().split("T")[0],
            }
          : event
      );
      setEvents(updatedEvents);
      setDraggedEvent(null);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    e.currentTarget.classList.add("bg-gray-200");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      e.currentTarget.classList.remove("bg-gray-200");
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <div className="p-4 h-full bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <ChevronLeft />
        </button>
        <h3 className="text-2xl font-bold text-gray-800">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
            onDragOver={handleDragOver}
            onDrop={(e) => day !== null && handleDrop(e, day)}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`p-2 h-24 text-sm border rounded-lg transition-colors ${
              day
                ? isToday(day)
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
                : "bg-gray-50"
            }`}
          >
            {day && (
              <>
                <div className="font-semibold mb-1">{day}</div>
                <div className="space-y-1">
                  {getEventsForDate(day).map((event) => (
                    <div
                      key={event.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, event)}
                      className={`p-1 text-xs rounded cursor-move ${
                        event.color ? event.color : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
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
