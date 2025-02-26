import { Loader2, PlaneTakeoff } from "lucide-react";
import Image from "next/image";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { FavIcon } from "@/public";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-gray-600 dark:text-gray-300">
            Welcome to Postier
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            create account to schedule your posts!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
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
