"use client";

import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { PlaneTakeoff } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 mx-auto w-5/6 items-center justify-between md:justify-center">
        {/* Logo */}
        <Link href="/" className="flex items-center w-1/4 font-semibold">
          <span className="flex items-center">P<span><PlaneTakeoff /></span>stier</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-10 text-sm font-medium w-2/4">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#contact">Contact</Link>
        </nav>

        {/* CTA Button (Desktop) */}
        <div className=" hidden md:flex items-center justify-end w-1/4">
          <Link
            href="/history"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
             hover:bg-indigo-500"
          >
            Get started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2.5 text-zinc-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <IconX className="h-6 w-6" aria-hidden="true" />
          ) : (
            <IconMenu2 className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          className="flex inset-0 z-40 bg-slate-200/5 py-5 shadow-md md:hidden flex-col items-center
         justify-center space-y-6"
        >
          <Link
            href="#features"
            className="text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/history"
            className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Get started
          </Link>
        </nav>
      )}
    </header>
  );
}
