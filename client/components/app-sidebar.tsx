"use client";

import {
  Calendar,
  CalendarCheck2,
  ChartNoAxesColumn,
  History,
  MessageSquareShare,
  Send,
} from "lucide-react";

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
import Theme from "./theme";

const headingItem = [
  {
    title: "Postier",
    url: "/",
    icon: Send,
  },
];

const menuItems = [
  {
    title: "Analytics",
    url: "/history",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Schedule",
    url: "/history",
    icon: CalendarCheck2,
  },
  {
    title: "Calendar",
    url: "/history",
    icon: Calendar,
  },
  {
    title: "Create-Post",
    url: "/post",
    icon: MessageSquareShare,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
    items: [
      {
        title: "Posted",
        url: "/posted",
      },
      {
        title: "Pending",
        url: "/pending",
      },
    ],
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
                    <item.icon className="text-indigo-600 animate-pulse dark:text-zinc-200" />
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
            <SidebarMenu className="pt-5 h-96">
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
            <Separator />
          </SidebarGroupContent>

          <SidebarMenu className="pt-4">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Theme />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
