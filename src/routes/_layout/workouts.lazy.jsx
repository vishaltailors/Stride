import FigureIndoorCycle from "@/assets/images/figure-indoor-cycle.svg";
import FigureMindAndBody from "@/assets/images/figure-mind-and-body.svg";
import FigureMixedCardio from "@/assets/images/figure-mixed-cardio.svg";
import FigureRun from "@/assets/images/figure-run.svg";
import FigureStrengthTraining from "@/assets/images/figure-strengthtraining.svg";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  TabMenuHorizontal,
  TabMenuHorizontalList,
  TabMenuHorizontalTrigger,
} from "@/components/ui/tab-menu-horizontal";
import {
  calculateWorkoutStats,
  getWorkoutsByRange,
} from "@/data/workouts.data";
import useDateRangeStore from "@/store/date-range-store";
import { RiRunLine } from "@remixicon/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { format, parseISO, subDays } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export const Route = createLazyFileRoute("/_layout/workouts")({
  component: Workouts,
});

function Workouts() {
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const [activeTab, setActiveTab] = useState("all");
  const [workouts, setWorkouts] = useState([]);

  // Memoize today to prevent unnecessary re-renders
  const today = useMemo(() => new Date(), []);

  // Fetch workouts data when date range changes
  useEffect(() => {
    const data = getWorkoutsByRange(dateRange);
    setWorkouts(data);
  }, [dateRange]);

  // No need for a separate handler as the DateRangeSelector
  // will automatically update the global date range store

  // Filter workouts based on active tab
  const filteredWorkouts = useMemo(() => {
    if (activeTab === "all") {
      return workouts;
    }

    const tabToWorkoutTypeMap = {
      walking: workouts.filter((w) => w.type === "Walking"),
      strength: workouts.filter(
        (w) => w.type === "Functional Strength Training",
      ),
      cycling: workouts.filter((w) =>
        ["Indoor Cycling", "Outdoor Cycling"].includes(w.type),
      ),
      mind: workouts.filter((w) => w.type === "Mind and Body"),
    };

    return tabToWorkoutTypeMap[activeTab] || workouts;
  }, [workouts, activeTab]);

  // Calculate statistics
  const stats = useMemo(() => {
    return calculateWorkoutStats(filteredWorkouts);
  }, [filteredWorkouts]);

  // Get formatted date header based on date range
  const dateHeader = useMemo(() => {
    switch (dateRange) {
      case "today":
        return format(today, "MMMM d, yyyy");
      case "this-week": {
        const startOfWeek = subDays(today, today.getDay() - 1);
        const endOfWeek = subDays(startOfWeek, -6);
        return `${format(startOfWeek, "MMMM d")} - ${format(endOfWeek, "d, yyyy")}`;
      }
      case "this-month":
        return format(today, "MMMM yyyy");
      case "this-year":
        return format(today, "yyyy");
      default:
        return format(today, "MMMM yyyy");
    }
  }, [dateRange, today]);

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <SidebarTrigger />
          <PageIcon as={RiRunLine} />
          <PageHeaderInfo>
            <PageTitle>
              <h1>Workouts</h1>
            </PageTitle>
            <PageDescription>
              A breakdown of all recorded workouts.
            </PageDescription>
          </PageHeaderInfo>
        </PageHeaderContent>
        <PageQuickActions>
          <DateRangeSelector />
        </PageQuickActions>
      </PageHeader>

      <div className="container">
        {/* Tab Menu */}
        <TabMenuHorizontal
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-6"
        >
          <TabMenuHorizontalList className="border-t-0">
            <TabMenuHorizontalTrigger value="all">All</TabMenuHorizontalTrigger>
            <TabMenuHorizontalTrigger value="walking">
              Walking
            </TabMenuHorizontalTrigger>
            <TabMenuHorizontalTrigger value="strength">
              Strength Training
            </TabMenuHorizontalTrigger>
            <TabMenuHorizontalTrigger value="cycling">
              Cycling
            </TabMenuHorizontalTrigger>
            <TabMenuHorizontalTrigger value="mind">
              Mind & Body
            </TabMenuHorizontalTrigger>
          </TabMenuHorizontalList>
        </TabMenuHorizontal>

        {/* Date Header */}
        <h2 className="mb-6 text-title-h4 font-medium">{dateHeader}</h2>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-label-md font-medium">
                Workouts
              </CardTitle>
              <div className="text-label-lg text-primary-base">
                {stats.totalWorkouts}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-text-sub-600">
                You've completed {stats.totalWorkouts} workouts during this
                period.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-label-md font-medium">Time</CardTitle>
              <div className="text-label-lg text-primary-base">
                {stats.totalTime}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-text-sub-600">
                Average: {stats.avgTime} per workout
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-label-md font-medium">
                Calories
              </CardTitle>
              <div className="text-label-lg text-primary-base">
                {stats.totalCalories.toLocaleString()} kcal
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-text-sub-600">
                Average: {stats.avgCalories} kcal per workout
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workouts List */}
        <div className="space-y-4">
          {filteredWorkouts.map((workout, index) => {
            let iconSrc;

            switch (workout.type) {
              case "Functional Strength Training":
                iconSrc = FigureStrengthTraining;
                break;
              case "Walking":
              case "Running":
                iconSrc = FigureRun;
                break;
              case "Indoor Cycling":
                iconSrc = FigureIndoorCycle;
                break;
              case "Mind and Body":
                iconSrc = FigureMindAndBody;
                break;
              default:
                iconSrc = FigureMixedCardio;
            }

            // Format the date (Today, Yesterday, or MM/DD)
            const displayDate =
              index === 0
                ? "Today"
                : index === 1
                  ? "Yesterday"
                  : format(parseISO(workout.date), "MMM d");

            return (
              <Card key={`${workout.type}-${index}`}>
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Workout Icon */}
                    <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-bg-weak-50">
                      <img
                        src={iconSrc}
                        alt={workout.type}
                        className="size-8"
                      />
                    </div>

                    {/* Workout Details */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-label-md font-medium">
                          {workout.type}
                        </h3>

                        {/* Date - moved to be on the same line as workout type */}
                        <span className="text-paragraph-sm text-text-sub-600">
                          {displayDate}
                        </span>
                      </div>

                      <div className="mt-1 flex gap-4">
                        <div>
                          <span className="text-label-sm text-text-sub-600">
                            {workout.duration}min
                          </span>
                        </div>

                        <div>
                          <span className="text-label-sm text-text-sub-600">
                            {workout.calories} kcal
                          </span>
                        </div>

                        {workout.distance && (
                          <div>
                            <span className="text-label-sm text-text-sub-600">
                              {workout.distance} km
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredWorkouts.length === 0 && (
            <Card>
              <div className="py-8 text-center text-text-sub-600">
                No workouts found for the selected filter
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
