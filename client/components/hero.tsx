"use client";

import { IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconBrandX } from "@tabler/icons-react";
import { Bell, Heart, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <div className="absolute text-indigo-400/25 top-10 left-32 animate-pulse">
          <IconBrandLinkedin  className="size-5" />
        </div>
        <div className="absolute top-1/4  text-indigo-400/25 right-[15%]  animate-pulse">
          <IconBrandWhatsapp className="size-5" />
        </div>
        <div className="absolute bottom-1/4  text-indigo-400/25 left-[20%] animate-bounce">
          <IconBrandX className="size-5" />
        </div>
        <div className="absolute top-1/3  text-indigo-400/25 left-[25%] animate-float">
          <IconBrandInstagram className="size-5" />
        </div>
        <div className="absolute bottom-20  text-indigo-400/25 right-36 animate-float-slow">
          <Heart className="size-5" />
        </div>
        <div className="absolute top-20  text-indigo-400/25 right-[35%] animate-float">
          <Bell className="size-5" />
        </div>
        <div className="absolute bottom-[40%]  text-indigo-400/25 right-[25%] animate-float-slow">
          <Zap className="size-5" />
        </div>
      </div>
      {/* Geometric Background */}

      <div className="mx-auto max-w-2xl py-10 md:py-10">
        <div
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          aria-hidden="true"
        >
          <div
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-indigo-200 to-indigo-500 opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="flex justify-center">
          <div className="relative rounded-full px-1 md:px-5 text-sm leading-6 border-2 border-dashed">
            busy today !! we&#39;ll <span className="animate-pulse">🚀 </span>{" "}
            post on behalf you
          </div>
        </div>

        <div className="text-center py-20 border-b-2 border-gray-400/20 dark:border-zinc-50/10 border-dashed">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Schedule Your Social Media Posts with{" "}
            <span className="border-b-2 border-b-indigo-600 dark:border-b-zinc-400 border-dashed">
              Ease
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Postier helps you maintain an active social media presence even on
            your busiest days. Schedule your posts in advance and let us handle
            the rest.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 ">
            <Link
              href="/history"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </Link>
            <Link
              href="#features"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
