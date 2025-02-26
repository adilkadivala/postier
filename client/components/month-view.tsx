"use client";

import type React from "react";

import { useState } from "react";
import { generateDays } from "@/lib/utils";
import { DragDrop, type Event } from "@/services/drag-drop";
import { cn } from "@/lib/utils";

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  setEvents: (events: Event[]) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  setEvents,
}) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const days = generateDays(month, year);
  const dragDrop = new DragDrop(events, setEvents, year, month);
  const today = new Date();
  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === month &&
    today.getFullYear() === year;

  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-7 gap-1 md:gap-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
        <div
          key={index}
          className="text-center font-medium text-muted-foreground py-2 text-xs sm:text-sm"
        >
          {day}
        </div>
      ))}

      {days.map((day, index) => (
        <div
          key={index}
          onDragOver={(e) => dragDrop.handleDragOver(e)}
          onDrop={(e) => day !== null && dragDrop.handleDrop(e, day)}
          onMouseEnter={() => day !== null && setHoveredDay(day)}
          onMouseLeave={() => setHoveredDay(null)}
          className={cn(
            "min-h-[80px] sm:min-h-[100px] md:min-h-[120px] p-1 sm:p-2 border rounded-md transition-colors bg-muted/50",
            day === null ? "bg-forground cursor-not-allowed" : "bg-background",
            isToday(day as number) && "ring-2 ring-primary",
            hoveredDay === day && "bg-muted/50"
          )}
        >
          {day !== null && (
            <>
              <div
                className={cn(
                  "text-xs sm:text-sm font-medium",
                  isToday(day) ? "text-primary" : "text-foreground"
                )}
              >
                {day}
              </div>
              <div className="mt-1 space-y-1 max-h-[60px] sm:max-h-[80px] md:max-h-[100px] overflow-y-auto">
                {dragDrop.getEventsForDate(day).map((event) => (
                  <div
                    key={event.id}
                    draggable
                    onDragStart={(e) => dragDrop.handleDragStart(e, event)}
                    className={cn(
                      "text-xs p-1 rounded truncate cursor-move",
                      event.color || "bg-primary/20 text-primary-foreground"
                    )}
                    title={event.title}
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
  );
};

export default MonthView;
