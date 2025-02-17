"use client";

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
      {/* Geometric Background */}

      <div className="mx-auto max-w-2xl py-10 md:py-10">
        <div className="flex justify-center">
          <div className="relative rounded-full px-1 md:px-5 text-sm leading-6 border-2 border-dashed">
            busy today !! we&#39;ll <span className="animate-pulse">🚀 </span> post
            on behalf you
          </div>
        </div>

        <div className="text-center py-20 border-b-2 border-dashed">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">Schedule Your Social Media Posts with <span className="border-b-2 border-b-indigo-600 dark:border-b-zinc-400 border-dashed">Ease</span>
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
