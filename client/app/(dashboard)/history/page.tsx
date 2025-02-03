  import React from "react";
  import Calendar from "@/components/calendar";

  const events = [
    { title: "Meeting", date: "2025-02-20", className:"" },
    { title: "Workshop", date: "2025-02-22" },
    { title: "Deadline", date: "2025-02-25" },
  ];

  const Page = () => {
    return <Calendar events={events} />;
  };

  export default Page;
