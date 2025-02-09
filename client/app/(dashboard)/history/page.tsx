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
  {
    id: "4",
    title: "party",
    date: "2025-02-27",
    color: "bg-purple-200 text-purple-800",
  },
  {
    id: "5",
    title: "birth-day",
    date: "2025-03-03",
    color: "bg-pink-200 text-pink-800",
  },
  {
    id: "6",
    title: "collage-party",
    date: "2025-02-15",
    color: "bg-pink-200 text-pink-800",
  },
  {
    id: "7",
    title: "fresher-party",
    date: "2025-02-21",
    color: "bg-pink-200 text-pink-800",
  },
  {
    id: "8",
    title: "new-employee",
    date: "2025-02-21",
    color: "bg-pink-200 text-pink-800",
  },
  {
    id: "9",
    title: "interview",
    date: "2025-02-21",
    color: "bg-pink-200 text-pink-800",
  },
  {
    id: "10",
    title: "job-listing",
    date: "2025-02-21",
    color: "bg-pink-200 text-pink-800",
  },
  {
    id: "11",
    title: "home-tour",
    date: "2025-02-21",
    color: "bg-pink-200 text-pink-800",
  },
  {
    id: "12",
    title: "family-date",
    date: "2025-02-21",
    color: "bg-pink-200 text-pink-800",
  },
];

const Page = () => {
  return <Calendar events={events} />;
};

export default Page;
