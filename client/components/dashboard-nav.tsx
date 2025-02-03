import { Brand } from "@/public";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const DashNavbar = () => {
  return (
    <nav className="border-b border-slate-200 dark:border-slate-800 flex items-center justify-between w-full px-4">
      <div className="w-fit">
        <Link href="/">
          <Image src={Brand} alt="logo" />
        </Link>
      </div>

      <div className="w-fit">
        <Button variant="ghost">Login</Button>
      </div>
    </nav>
  );
};

export default DashNavbar;
