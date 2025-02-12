"use client";
import Calendar from "@/components/calendar";

const events = [
  {
    id: "1",
    title: "3-Day Conference",
    startDate: "2025-02-20",
    endDate: "2025-02-22",
    color: "bg-blue-200 text-blue-800",
  },
  {
    id: "2",
    title: "Workshop",
    startDate: "2025-02-22",
    endDate: "2025-02-22",
    color: "bg-green-200 text-green-800",
  },
  {
    id: "3",
    title: "Deadline",
    startDate: "2025-02-25",
    endDate: "2025-02-25",
    color: "bg-red-200 text-red-800",
  },
  {
    id: "4",
    title: "3-Day Party",
    startDate: "2025-02-27",
    endDate: "2025-03-01",
    color: "bg-purple-200 text-purple-800",
  },
  {
    id: "5",
    title: "middle",
    startDate: "2025-02-10",
    endDate: "2025-02-12",
    color: "bg-purple-200 text-purple-800",
  },
];

const Page = () => {
  return <Calendar events={events} />;
};

export default Page;
