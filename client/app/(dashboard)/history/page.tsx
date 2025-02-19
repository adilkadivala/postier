"use client";
import Calendar from "@/components/calendar";

const posts = [
  {
    id: "1",
    title: "scheduling a post",
    startDate: "2025-02-20",
    endDate: "2025-02-22",
    color: "bg-blue-200 text-blue-800",
    post:"hey now it's starting scheduling a post functionality on my project!! 😄"
  },
  {
    id: "2",
    title: "Workshop",
    startDate: "2025-02-22",
    endDate: "2025-02-22",
    color: "bg-green-200 text-green-800",
    post:"hey now it's starting scheduling a post functionality on my project!! 😄"

  },
  {
    id: "3",
    title: "Deadline",
    startDate: "2025-02-25",
    endDate: "2025-02-25",
    color: "bg-red-200 text-red-800",
    post:"hey now it's starting scheduling a post functionality on my project!! 😄"

  },
  {
    id: "4",
    title: "3-Day Party",
    startDate: "2025-02-27",
    endDate: "2025-03-01",
    color: "bg-purple-200 text-purple-800",
    post:"hey now it's starting scheduling a post functionality on my project!! 😄"

  },
  {
    id: "5",
    title: "middle",
    startDate: "2025-02-10",
    endDate: "2025-02-12",
    color: "bg-purple-200 text-purple-800",
    post:"hey now it's starting scheduling a post functionality on my project!! 😄"
  },
];

const Page = () => {
  return <Calendar posts={posts} />;
};

export default Page;
