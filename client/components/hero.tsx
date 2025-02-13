"use client";

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
    <div className="relative overflow-hidden w-full min-h-[90vh]">
      {/* Geometric Background */}
      <div className="absolute inset-0 -z-10 -top-1 overflow-hidden flex items-center justify-center">
        <svg
          className="absolute inset-0 w-full h-full stroke-gray-200 dark:stroke-slate-900"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-2xl py-10 md:py-10">
        <div className="flex justify-center">
          <div className="relative rounded-full px-1 md:px-5 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-700/10 dark:hover:ring-gray-700/20 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30">
            busy today !! we&#39;ll <span className="animate-pulse">🚀 </span> post
            on behalf you
          </div>
        </div>

        <div className="text-center py-20">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Schedule Your Social Media Posts with Ease
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Postier helps you maintain an active social media presence even on
            your busiest days. Schedule your posts in advance and let us handle
            the rest.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a
              href="#features"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
