"use client";

import { PlaneTakeoff } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { menuItems } from "@/constant/app-sidebar";

const headingItem = [
  {
    title: "Postier",
    url: "/",
    icon: PlaneTakeoff,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {headingItem.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className="flex items-center gap-2 py-3"
                  >
                    <item.icon className="text-indigo-600 dark:text-zinc-200" />
                    <span className="text-slate-900 font-bold dark:text-zinc-200">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <Separator />
          </SidebarMenu>

          {/* Sidebar menu */}
          <SidebarGroupContent>
            <SidebarMenu className="pt-5">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
