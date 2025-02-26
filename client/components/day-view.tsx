"use client";

import type React from "react";

import { useState } from "react";
import type { Event } from "@/services/drag-drop";
import { cn, formatDateWithTime } from "@/lib/utils";

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  setEvents: (events: Event[]) => void;
}

const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  setEvents,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const [hoveredHour, setHoveredHour] = useState<number | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);

  const now = new Date();
  const isToday =
    now.getDate() === day &&
    now.getMonth() === month &&
    now.getFullYear() === year;

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const getEventsForHour = (hour: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year &&
        eventDate.getHours() === hour
      );
    });
  };

  const handleDragStart = (e: React.DragEvent, event: Event) => {
    e.dataTransfer.setData("text/plain", event.id);
    setDraggedEvent(event);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, hour: number) => {
    e.preventDefault();

    if (!draggedEvent) return;

    const startDate = new Date(draggedEvent.startDate);
    const endDate = new Date(draggedEvent.endDate);
    const duration = endDate.getTime() - startDate.getTime();

    // Create new start date with the target hour
    const newStartDate = formatDateWithTime(
      year,
      month,
      day,
      hour,
      startDate.getMinutes()
    );

    // Calculate new end date preserving duration
    const newEndDateTime = new Date(year, month, day);
    newEndDateTime.setHours(hour, startDate.getMinutes(), 0, 0);
    newEndDateTime.setTime(newEndDateTime.getTime() + duration);

    const newEndDate = formatDateWithTime(
      newEndDateTime.getFullYear(),
      newEndDateTime.getMonth(),
      newEndDateTime.getDate(),
      newEndDateTime.getHours(),
      newEndDateTime.getMinutes()
    );

    // Update the events array
    const updatedEvents = events.map((ev) =>
      ev.id === draggedEvent.id
        ? { ...ev, startDate: newStartDate, endDate: newEndDate }
        : ev
    );

    setEvents(updatedEvents);
    setDraggedEvent(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 border-b">
        <div className="p-2 text-center text-sm font-medium">
          {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          {isToday && (
            <div
              className="absolute left-0 right-0 border-t-2 border-red-500 z-20 pointer-events-none"
              style={{
                top: `calc(${currentHour * 48}px + ${
                  (currentMinute / 60) * 48
                }px)`,
              }}
            >
              <div className="absolute -top-2 -left-1 w-2 h-2 rounded-full bg-red-500"></div>
            </div>
          )}

          {hours.map((hour) => {
            const hourEvents = getEventsForHour(hour);

            return (
              <div
                key={hour}
                className={cn(
                  "border-t relative h-12",
                  isToday && hour === currentHour ? "bg-primary/5" : "",
                  hoveredHour === hour ? "bg-muted/50" : ""
                )}
                onMouseEnter={() => setHoveredHour(hour)}
                onMouseLeave={() => setHoveredHour(null)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, hour)}
              >
                <div className="absolute left-0 top-0 w-16 text-xs text-right pr-2 text-muted-foreground">
                  {hour.toString().padStart(2, "0")}:00
                </div>

                <div className="ml-16 h-full relative">
                  {hourEvents.map((event, index) => {
                    const width = 100 / (hourEvents.length || 1);
                    const left = index * width;

                    return (
                      <div
                        key={event.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, event)}
                        className={cn(
                          "absolute top-0 h-11 p-1 text-xs rounded truncate cursor-move z-10",
                          event.color || "bg-primary/20 text-primary-foreground"
                        )}
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                          maxWidth: "calc(100% - 4px)",
                        }}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayView;
