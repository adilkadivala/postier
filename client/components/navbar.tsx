"use client";

import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Brand } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Send />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#contact">Contact</Link>
        </nav>

        {/* CTA Button (Desktop) */}
        <Link
          href="/history"
          className="hidden md:block rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Get started
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2.5 text-gray-700"
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
        <nav className="flex inset-0 z-40 bg-slate-400/20 shadow-md md:hidden flex-col items-center justify-center space-y-6">
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
