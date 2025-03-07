"use client";
import BackgroundPattern from "@/components/BackgroundPattern";
import Clouds from "@/components/clouds";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import NewsLatter from "@/components/news-latter";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <BackgroundPattern>
        <main>
          <Hero />
          <Clouds />
          <Features />
          <Pricing />
          <NewsLatter />
        </main>
      </BackgroundPattern>
      <Footer />
    </div>
  );
}
