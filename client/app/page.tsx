"use client"
import BackgroundPattern from "@/components/BackgroundPattern"
import Clouds from "@/components/clouds"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <BackgroundPattern>
        <main className="pt-14">
          <Hero />
          <Clouds />
        </main>
      </BackgroundPattern>
    </div>
  )
}

