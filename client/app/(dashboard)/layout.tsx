"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Theme from "@/components/theme";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { menuItems } from "@/constant/app-sidebar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentMenuItem = menuItems.find((item) => item.url === pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between w-full gap-2 px-4">
            <SidebarTrigger />
            <Breadcrumb className="flex flex-1">
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={currentMenuItem?.url || "/"}>
                    {currentMenuItem?.breadcrumb || "Home"}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {currentMenuItem?.breadTtitle || "welcome"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Theme />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 border-l border-t rounded-md ml-2">
          <main className="p-2 bg-sidebar">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
