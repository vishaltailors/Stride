import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RiCustomerServiceLine, RiSettings2Line } from "@remixicon/react";
import { Link } from "@tanstack/react-router";

export function NavSecondary() {
  const items = [
    {
      title: "Settings",
      url: "/settings",
      icon: <RiSettings2Line className="size-5" />,
    },
    {
      title: "Support",
      url: "",
      icon: <RiCustomerServiceLine className="size-5" />,
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
