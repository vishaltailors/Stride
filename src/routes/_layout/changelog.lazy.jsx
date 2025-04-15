import {
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageHeaderInfo,
  PageIcon,
  PageTitle,
} from "@/components/shared/page-header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RiHistoryLine } from "@remixicon/react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/changelog")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <SidebarTrigger />
          <PageIcon as={RiHistoryLine} />
          <PageHeaderInfo>
            <PageTitle>
              <h1>Changelog</h1>
            </PageTitle>
            <PageDescription>
              Log of recent updates and feature changes.
            </PageDescription>
          </PageHeaderInfo>
        </PageHeaderContent>
      </PageHeader>

      <div className="container space-y-8 py-6">
        <div className="border-b pb-4">
          <h2 className="text-2xl mb-1 font-bold">Version 1.0.0</h2>
          <p className="text-sm text-muted-foreground">April 16, 2025</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">🚀 Initial Release</h3>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>Dashboard with customizable widget layout</li>
              <li>Health metrics tracking and visualization</li>
              <li>Activity logging and progress tracking</li>
              <li>User preferences with persistent storage</li>
              <li>Responsive design for all device sizes</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">🔧 Features</h3>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>Drag-and-drop widget customization</li>
              <li>Saved layouts using localStorage</li>
              <li>Interactive data visualizations</li>
              <li>Quick access sidebar navigation</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">🔮 Coming Soon</h3>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>New detailed health metric views with expanded analytics</li>
              <li>Additional widget types and customization options</li>
              <li>Enhanced data export capabilities</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
