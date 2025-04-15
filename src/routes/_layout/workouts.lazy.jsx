import FigureStrengthTraining from "@/assets/images/figure-strengthtraining.svg";
import {
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageHeaderInfo,
  PageIcon,
  PageQuickActions,
  PageTitle,
} from "@/components/shared/page-header";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/workouts")({
  component: Workouts,
});

function Workouts() {
  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageIcon
            as={(props) => <img src={FigureStrengthTraining} {...props} />}
          />
          <PageHeaderInfo>
            <PageTitle>
              <h1>Workouts</h1>
            </PageTitle>
            <PageDescription>
              A breakdown of all recorded workouts.
            </PageDescription>
          </PageHeaderInfo>
        </PageHeaderContent>
      </PageHeader>
      <div className="container py-6"></div>
    </>
  );
}
