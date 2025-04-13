"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RiDashboardLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";

export function NavPrimary() {
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: <RiDashboardLine className="size-5" />,
    },
  ];

  return items.map((item) => (
    <Link href={item.url}>
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton tooltip={`${item.title}`}>
          {item.icon}
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  ));
}
