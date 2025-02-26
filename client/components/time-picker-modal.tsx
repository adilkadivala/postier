"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Post } from "@/services/drag-drop";
import { cn } from "@/lib/utils";

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (time: string) => void;
  selectedDate: Date | null;
  post?: Post;
}

export function TimePickerModal({
  isOpen,
  onClose,
  onSchedule,
  selectedDate,
  post,
}: TimePickerModalProps) {
  const [selectedTime, setSelectedTime] = React.useState("12:00");
  const timeSlots = generateTimeSlots();

  function generateTimeSlots() {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const period = hour < 12 ? "AM" : "PM";
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const displayTime = `${displayHour}:${minute
          .toString()
          .padStart(2, "0")} ${period}`;
        slots.push({ time, displayTime });
      }
    }
    return slots;
  }

  const handleSchedule = () => {
    onSchedule(selectedTime);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Schedule Post
          </DialogTitle>
        </DialogHeader>

        {selectedDate && post && (
          <div className="mb-4">
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Scheduling post: {post.title}
            </div>
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {selectedDate.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        )}

        <div className="grid gap-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Select Time
            </label>
            <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto pr-2">
              {timeSlots.map(({ time, displayTime }) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={cn(
                    "text-xs py-2 px-3",
                    selectedTime === time &&
                      "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                  onClick={() => setSelectedTime(time)}
                >
                  {displayTime}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleSchedule} className="w-full">
            Schedule for{" "}
            {timeSlots.find((slot) => slot.time === selectedTime)?.displayTime}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
