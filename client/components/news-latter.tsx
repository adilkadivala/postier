"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Mail,
  Star,
  Sparkles,
  MessageCircle,
  Heart,
  Bell,
  Zap,
  Send,
} from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    setEmail("");
    setLoading(false);
  }

  return (
    <div className="mx-auto relative py-12 md:py-24" id="contact">
      <div className="absolute inset-0">
        <div className="absolute text-indigo-300/50 top-10 left-32 animate-pulse">
          <Mail className="size-5" />
        </div>
        <div className="absolute top-1/4 text-indigo-300/25 right-[15%]  animate-spin">
          <Star className="size-5" />
        </div>
        <div className="absolute bottom-1/4 text-indigo-300/25 left-[20%] animate-bounce">
          <Sparkles className="size-5" />
        </div>
        <div className="absolute top-1/3 text-indigo-300/25 left-[25%] animate-float">
          <MessageCircle className="size-5" />
        </div>
        <div className="absolute bottom-20 text-indigo-300/25 right-36 animate-float-slow">
          <Heart className="size-5" />
        </div>
        <div className="absolute top-20 text-indigo-300/25 right-[35%] animate-float">
          <Bell className="size-5" />
        </div>
        <div className="absolute bottom-[40%] text-indigo-300/25 right-[25%] animate-float-slow">
          <Zap className="size-5" />
        </div>
      </div>

      {/* Content */}
      <div className="relative container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <p className="text-4xl font-semibold tracking-tighter text-gray-900 dark:text-gray-100">
              Join Our Newsletter
            </p>
            <p className="mx-auto text-gray-900 dark:text-gray-100">
              Get the latest updates, exclusive content, and special offers
              delivered directly to your inbox.
            </p>
          </div>
          <div className="w-full max-w-md space-y-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/15 to-indigo-500 blur-3xl -z-10 transform rotate-45 translate-y-1/2"></div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 min-[400px]:flex-row p-2 backdrop-blur-sm rounded-2xl border border-gray-700 dark:border-gray-400"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-none bg-transparent "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-gray-300 transition-all duration-300"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-center px-4 py-2 rounded-full bg-background/50 border border-gray-400 border-dashed mx-auto">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
