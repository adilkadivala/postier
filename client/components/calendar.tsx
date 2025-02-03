"use client";

import React, { useState } from "react";

// Helper functions to generate the days of the month
const generateDays = (month: any, year: any): any => {
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get day of the week the month starts on

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Empty slots for days before the first day of the month
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i); // Add the actual days of the month
  }

  return days;
};

const Calendar = ({ events }: any) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const days = generateDays(month, year); // Generate the days for the current month

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  // Check if the event is on a specific date
  const isEventOnDate = (day: any) => {
    return events.some((event: any) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  // Handle date click event
  const handleDateClick = (day: any) => {
    if (day) {
      alert(`You clicked on: ${day}`);
    }
  };

  return (
    <div className="p-4 h-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Prev
        </button>
        <h3 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })}
        </h3>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Names */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (dayName, index) => (
            <div
              key={index}
              className="text-center font-medium text-gray-700 py-2"
            >
              {dayName}
            </div>
          )
        )}

        {/* Days of the Month */}
        {days.map((day: any, index: number) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)} // Add click event here
            className={`p-9 text-center rounded-lg ${
              day
                ? isEventOnDate(day)
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                : "bg-gray-50"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
