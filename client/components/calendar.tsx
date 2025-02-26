"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MonthView from "@/components/month-view";
import WeekView from "@/components/week-view";
import DayView from "@/components/day-view";
import type { Event } from "@/services/drag-drop";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarProps {
  posts: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ posts: initialEvents }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  const getHeaderText = () => {
    return currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-full rounded-lg bg-background">
      <div className="flex flex-col sm:flex-row justify-between items-center p-2 border-b gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={navigatePrevious}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={navigateNext}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="ml-2" onClick={navigateToday}>
            Today
          </Button>
          <h3 className="text-xl font-semibold ml-4">{getHeaderText()}</h3>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setViewMode("month")}
            variant={viewMode === "month" ? "default" : "outline"}
            size="sm"
          >
            Month
          </Button>
          <Button
            onClick={() => setViewMode("week")}
            variant={viewMode === "week" ? "default" : "outline"}
            size="sm"
          >
            Week
          </Button>
          <Button
            onClick={() => setViewMode("day")}
            variant={viewMode === "day" ? "default" : "outline"}
            size="sm"
          >
            Day
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "flex-1 overflow-auto",
          viewMode === "month" ? "p-4" : "p-0"
        )}
      >
        {viewMode === "month" && (
          <MonthView
            currentDate={currentDate}
            events={events}
            setEvents={setEvents}
          />
        )}
        {viewMode === "week" && (
          <WeekView
            currentDate={currentDate}
            events={events}
            setEvents={setEvents}
          />
        )}
        {viewMode === "day" && (
          <DayView
            currentDate={currentDate}
            events={events}
            setEvents={setEvents}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
