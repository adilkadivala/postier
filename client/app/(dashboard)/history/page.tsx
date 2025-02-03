"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const HistoryPage = () => {
  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        height={"auto"} // Adjusts height dynamically
        dayMaxEventRows={3} // Limits events per day to 3 rows
        fixedWeekCount={false} // Avoids showing extra empty weeks
        contentHeight={600} // Set calendar height
        dayHeaderClassNames="bg-gray-200 text-black py-2" // Customize weekday headers
        eventClassNames="bg-blue-500 text-white px-2 py-1 rounded-md" // Customize event styling
      />
    </div>
  );
};

export default HistoryPage;
