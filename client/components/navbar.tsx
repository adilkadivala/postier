import { Brand } from "@/public";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b border-slate-200 dark:border-slate-800 flex items-center justify-between w-full px-4">
      <div className="w-fit">
        <Image src={Brand} alt="logo" />
      </div>
      <div className="flex items-center justify-between w-1/4">
        <Link href="/">Home</Link>
        <Link href="/">Features</Link>
        <Link href="/">Testimonial</Link>
      </div>
      <div className="w-fit">
        <Link href="/history">History</Link>
      </div>
    </nav>
  );
};

export default Navbar;
