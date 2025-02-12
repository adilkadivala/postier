"use client";

import type React from "react";
import { formatDate } from "@/lib/utils";

export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  color?: string;
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
      return current >= start && current <= end;
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

  clearHighlights(): void {
    const dropzones = document.querySelectorAll(".dropzone");
    dropzones.forEach((zone) => zone.classList.remove("bg-gray-200"));
    this.dragCounter = 0;
  }

  handleDrop(e: React.DragEvent, day: number): void {
    e.preventDefault();
    this.clearHighlights();

    if (this.draggedEvent) {
      const dropDate = new Date(this.year, this.month, day);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (dropDate < today) {
        this.draggedEvent = null;
        return;
      }

      const startDate = new Date(this.draggedEvent.startDate);
      const endDate = new Date(this.draggedEvent.endDate);
      const duration = endDate.getTime() - startDate.getTime();

      const newStartDate = formatDate(this.year, this.month, day);
      const newEndDate = formatDate(
        this.year,
        this.month,
        day + Math.floor(duration / (24 * 60 * 60 * 1000))
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
    e.currentTarget.classList.add("bg-gray-200");
  }

  handleDragLeave(e: React.DragEvent): void {
    this.dragCounter--;
    if (this.dragCounter === 0) {
      e.currentTarget.classList.remove("bg-gray-200");
    }
  }
}
