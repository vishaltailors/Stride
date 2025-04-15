"use client";

import FigureStrengthTraining from "@/assets/images/figure-strengthtraining.svg";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RiDashboardLine, RiRunLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";

export function NavPrimary() {
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: <RiDashboardLine className="size-5" />,
    },
    {
      title: "Activity",
      url: "/activity",
      icon: <RiRunLine className="size-5" />,
    },
    {
      title: "Workouts",
      url: "/workouts",
      icon: (
        <img
          src={FigureStrengthTraining}
          className="mr-1 size-4 group-data-[collapsible=icon]:mx-auto"
        />
      ),
    },
  ];

  return items.map((item, index) => (
    <Link key={index} href={item.url}>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={`${item.title}`}>
          {item.icon}
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  ));
}
