import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RiHistoryLine, RiInformationLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";

export function NavSecondary() {
  const items = [
    {
      title: "Changelog",
      url: "/changelog",
      icon: <RiHistoryLine className="size-5" />,
    },
    {
      title: "About",
      url: "/about",
      icon: <RiInformationLine className="size-5" />,
    },
  ];

  return items.map((item) => (
    <SidebarMenuItem key={item.title}>
      <Link href={item.url}>
        <SidebarMenuButton tooltip={item.title}>
          {item.icon}
          {item.title}
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  ));
}
