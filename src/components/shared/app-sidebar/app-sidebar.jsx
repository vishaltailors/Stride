import Logo from "@/assets/images/logo.svg";
import { NavPrimary } from "@/components/shared/app-sidebar/nav-primary";
import { NavSecondary } from "@/components/shared/app-sidebar/nav-secondary";
import { NavUser } from "@/components/shared/app-sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

export async function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton>
            <div>
              <div className="flex items-center gap-2">
                <img
                  src={Logo}
                  alt="Stride"
                  className="size-8 shrink-0 object-contain pb-0.5"
                />
                <span className="truncate text-label-xl font-bold">Stride</span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="border-t p-2">
        <SidebarMenu>
          <NavPrimary />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <NavSecondary />
          <NavUser />
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
