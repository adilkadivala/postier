"use client";

import type React from "react";

import { useState } from "react";
import type { Event } from "@/services/drag-drop";
import { cn, formatDateWithTime } from "@/lib/utils";

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  setEvents: (events: Event[]) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  setEvents,
}) => {
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    return day;
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const today = new Date();
  const [hoveredSlot, setHoveredSlot] = useState<{
    day: Date;
    hour: number;
  } | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);

  const isToday = (date: Date) =>
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear();

  const getEventsForHour = (date: Date, hour: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
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

  const handleDrop = (e: React.DragEvent, targetDay: Date, hour: number) => {
    e.preventDefault();

    if (!draggedEvent) return;

    // Prevent dropping on past dates
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (targetDay < today) {
      setDraggedEvent(null);
      return;
    }

    const startDate = new Date(draggedEvent.startDate);
    const endDate = new Date(draggedEvent.endDate);
    const duration = endDate.getTime() - startDate.getTime();

    // Create new start date with the target day and hour
    const newStartDate = formatDateWithTime(
      targetDay.getFullYear(),
      targetDay.getMonth(),
      targetDay.getDate(),
      hour,
      startDate.getMinutes()
    );

    // Calculate new end date preserving duration
    const newEndDateTime = new Date(targetDay);
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
      <div className="grid grid-cols-8 border-b">
        <div className="border-r p-2 text-center text-xs font-medium text-muted-foreground">
          GMT
        </div>
        {weekDays.map((day, i) => (
          <div
            key={i}
            className={cn(
              "p-2 text-center border-r text-xs sm:text-sm font-medium",
              isToday(day) ? "bg-primary/10" : ""
            )}
          >
            <div>{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div
              className={cn(
                isToday(day)
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              )}
            >
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="relative min-w-[800px]">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b">
              <div className="border-r p-2 text-xs text-center text-muted-foreground">
                {hour.toString().padStart(2, "0")}:00
              </div>

              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForHour(day, hour);

                return (
                  <div
                    key={dayIndex}
                    className={cn(
                      "border-r relative h-12 p-1",
                      isToday(day) ? "bg-primary/5" : "",
                      hoveredSlot?.day.getDate() === day.getDate() &&
                        hoveredSlot?.day.getMonth() === day.getMonth() &&
                        hoveredSlot?.day.getFullYear() === day.getFullYear() &&
                        hoveredSlot?.hour === hour
                        ? "bg-muted/50"
                        : ""
                    )}
                    onMouseEnter={() => setHoveredSlot({ day, hour })}
                    onMouseLeave={() => setHoveredSlot(null)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, day, hour)}
                  >
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, event)}
                        className={cn(
                          "flex flex-col gap-x-3 overflow-scroll mx-1 p-1 text-xs rounded truncate cursor-move z-10",
                          event.color || "bg-primary/20 text-primary-foreground"
                        )}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
