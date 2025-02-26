"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { SignIn, ClerkLoaded, ClerkLoading, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FavIcon } from "@/public";

export default function Page() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-gray-600 dark:text-gray-300">Welcome Back</h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Log in to account for getting back to your schedules!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn
              path="/sign-in"
              routing="path"
              afterSignInUrl="/history"
              redirectUrl="/history"
            />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src={FavIcon} height={100} width={100} alt="Side-logo" />
      </div>
    </div>
  );
}
