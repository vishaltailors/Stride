import DateRangeSelector from "@/components/shared/date-range-selector";
import {
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageHeaderInfo,
  PageIcon,
  PageQuickActions,
  PageTitle,
} from "@/components/shared/page-header";
import { RiRunLine } from "@remixicon/react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/activity")({
  component: Activity,
});

function Activity() {
  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageIcon as={RiRunLine} />
          <PageHeaderInfo>
            <PageTitle>
              <h1>Activity</h1>
            </PageTitle>
            <PageDescription>
              Your activity metrics. Everything in one view!
            </PageDescription>
          </PageHeaderInfo>
        </PageHeaderContent>
        <PageQuickActions>
          <DateRangeSelector />
        </PageQuickActions>
      </PageHeader>
      <div className="container py-6"></div>
    </>
  );
}
