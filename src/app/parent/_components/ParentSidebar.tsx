"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Baby, House, Settings } from "lucide-react";
import Link from "next/link";

const items = [
  { title: "Home", href: "#", icon: House },
  { title: "Children", href: "#", icon: Baby },
  { title: "Settings", href: "#", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <div className="px-2 py-1 text-sm font-semibold">Parent Dashboard</div>
      <SidebarGroup />
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarGroup />
      <SidebarFooter />
    </Sidebar>
  );
}
