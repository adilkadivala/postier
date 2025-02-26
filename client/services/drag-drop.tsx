"use client";

import type React from "react";
import { formatDate, formatDateWithTime } from "@/lib/utils";

export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  color?: string;
  description?: string;
  location?: string;
  category?: string;
}

export class DragDrop {
  draggedEvent: Event | null = null;
  dragCounter = 0;
  events: Event[];
  setEvents: (events: Event[]) => void;
  year: number;
  month: number;

  constructor(
    events: Event[],
    setEvents: (events: Event[]) => void,
    year: number,
    month: number
  ) {
    this.events = events;
    this.setEvents = setEvents;
    this.year = year;
    this.month = month;
  }

  getEventsForDate(day: number | null): Event[] {
    if (day === null) return [];
    const dateStr = formatDate(this.year, this.month, day);
    return this.events.filter((ev) => {
      const start = new Date(ev.startDate);
      const end = new Date(ev.endDate);
      const current = new Date(dateStr);

      // Set hours to 0 to compare dates only
      current.setHours(0, 0, 0, 0);
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(end);
      endDate.setHours(0, 0, 0, 0);

      return current >= startDate && current <= endDate;
    });
  }

  handleDragStart(e: React.DragEvent, event: Event): void {
    this.draggedEvent = event;
    e.dataTransfer.setData("text/plain", event.id);
    e.dataTransfer.effectAllowed = "move";
  }

  handleDragOver(e: React.DragEvent): void {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  handleDragBlock(e: React.DragEvent): void {
    e.preventDefault();
  }

  clearHighlights(): void {
    const dropzones = document.querySelectorAll(".dropzone");
    dropzones.forEach((zone) => zone.classList.remove("bg-muted"));
    this.dragCounter = 0;
  }

  handleDrop(e: React.DragEvent, day: number, hour?: number): void {
    e.preventDefault();
    this.clearHighlights();

    if (this.draggedEvent) {
      const dropDate = new Date(this.year, this.month, day);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Prevent dropping on past dates
      if (dropDate < today) {
        this.draggedEvent = null;
        return;
      }

      const startDate = new Date(this.draggedEvent.startDate);
      const endDate = new Date(this.draggedEvent.endDate);
      const duration = endDate.getTime() - startDate.getTime();

      // If hour is provided, use it; otherwise, preserve the original hour
      const startHour = hour !== undefined ? hour : startDate.getHours();
      const startMinute = startDate.getMinutes();

      const newStartDate = formatDateWithTime(
        this.year,
        this.month,
        day,
        startHour,
        startMinute
      );

      // Calculate new end date preserving duration
      const newEndDateTime = new Date(dropDate);
      newEndDateTime.setHours(startHour, startMinute, 0, 0);
      newEndDateTime.setTime(newEndDateTime.getTime() + duration);

      const newEndDate = formatDateWithTime(
        newEndDateTime.getFullYear(),
        newEndDateTime.getMonth(),
        newEndDateTime.getDate(),
        newEndDateTime.getHours(),
        newEndDateTime.getMinutes()
      );

      const updatedEvents = this.events.map((ev) =>
        ev.id === this.draggedEvent!.id
          ? { ...ev, startDate: newStartDate, endDate: newEndDate }
          : ev
      );

      this.setEvents(updatedEvents);
      this.draggedEvent = null;
    }
  }

  handleDragEnter(e: React.DragEvent): void {
    e.preventDefault();
    this.dragCounter++;
    e.currentTarget.classList.add("bg-muted");
  }

  handleDragLeave(e: React.DragEvent): void {
    this.dragCounter--;
    if (this.dragCounter === 0) {
      e.currentTarget.classList.remove("bg-muted");
    }
  }
}
