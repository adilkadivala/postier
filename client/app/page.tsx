"use client";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="px-5 w-full h-full">
      <Navbar />
      <Hero />
    </div>
  );
}
