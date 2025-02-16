"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FirstLogoWhite,
  FirstLogoDark,
  SecondLogoWhite,
  SecondLogoDark,
  ThirdLogoWhite,
  ThirdLogoDark,
  ForthLogoWhite,
  ForthLogoDark,
  FifthLogoWhite,
  FifthLogoDark,
} from "@/public";

const Clouds = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logos = [
    { light: FirstLogoWhite, dark: FirstLogoDark, alt: "Transistor" },
    { light: SecondLogoWhite, dark: SecondLogoDark, alt: "Reform" },
    { light: ThirdLogoWhite, dark: ThirdLogoDark, alt: "Tuple" },
    { light: ForthLogoWhite, dark: ForthLogoDark, alt: "SavvyCal" },
    { light: FifthLogoWhite, dark: FifthLogoDark, alt: "Statamic" },
  ];

  return (
    <div className="py-5 md:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-gray-900 dark:text-zinc-200">
          Trusted by the world's most innovative <span className="border-b-2 border-b-stone-500 dark:border-b-zinc-400 border-dashed">Startups</span> 
        </h2>
        
        <div className="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {logos.map((logo, index) => (
            <Image
              key={index}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={theme === "dark" ? logo.light : logo.dark}
              alt={logo.alt}
              width="158"
              height="48"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clouds;
