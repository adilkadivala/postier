"use client";

import * as React from "react";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { Send } from "lucide-react";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div>
          <div>
            <Link href="/" className="flex items-center justify-evenly">
              {/* {isActive} */}
              <Send />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Postier</span>
              </div>
            </Link>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
