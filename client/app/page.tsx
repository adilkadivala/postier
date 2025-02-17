"use client"
import BackgroundPattern from "@/components/BackgroundPattern"
import Clouds from "@/components/clouds"
import Features from "@/components/features"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <BackgroundPattern>
        <main>
          <Hero />
          <Clouds />
          <Features />
        </main>
      </BackgroundPattern>
    </div>
  )
}

