import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useMediaQuery } from "@uidotdev/usehooks";

export const Route = createFileRoute("/_layout")({
  component: Layout,
});

function Layout() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <SidebarProvider defaultOpen={isLargeScreen}>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
