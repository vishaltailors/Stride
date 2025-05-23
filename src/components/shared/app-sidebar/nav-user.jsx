import ProfileImage from "@/assets/images/avatar.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  RiExpandUpDownLine,
  RiLogoutBoxRLine,
  RiUserSettingsLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";

export function NavUser() {
  const { isTablet } = useSidebar();
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const onSignout = async () => {
    logout();
    navigate({ to: "/signin" });
  };

  return (
    <SidebarMenuItem className="mt-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar size="32">
              <AvatarImage src={ProfileImage} />
            </Avatar>
            <div className="grid flex-1 text-left text-label-sm leading-tight">
              <span className="truncate font-semibold">Vishal Tailor</span>
              <span className="truncate text-label-xs">
                vishaltailor@stride.com
              </span>
            </div>
            <RiExpandUpDownLine className="ml-auto size-5" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side={isTablet ? "bottom" : "right"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal normal-case text-text-strong-950">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-label-sm">
              <Avatar size="32">
                <AvatarImage src={ProfileImage} />
              </Avatar>
              <div className="grid flex-1 text-left text-label-sm leading-tight">
                <span className="truncate font-semibold">Vishal Tailor</span>
                <span className="truncate text-label-xs">
                  vishaltailor@stride.com
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="h-[1px] bg-stroke-soft-200" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => navigate({ to: "/profile" })}
              disabled
            >
              <RiUserSettingsLine className="size-5" />
              Profile settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="h-[1px] bg-stroke-soft-200" />
          <DropdownMenuItem onSelect={onSignout}>
            <RiLogoutBoxRLine className="size-5" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
