"use client";
import Calendar from "@/components/calendar";

const events = [
  {
    id: "1",
    title: "Meeting",
    date: "2025-02-20",
    color: "bg-blue-200 text-blue-800",
  },
  {
    id: "2",
    title: "Workshop",
    date: "2025-02-22",
    color: "bg-green-200 text-green-800",
  },
  {
    id: "3",
    title: "Deadline",
    date: "2025-02-25",
    color: "bg-red-200 text-red-800",
  },
];

const Page = () => {
  return <Calendar events={events} />;
};

export default Page;
