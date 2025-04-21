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
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  TabMenuHorizontal,
  TabMenuHorizontalList,
  TabMenuHorizontalTrigger,
} from "@/components/ui/tab-menu-horizontal";
import WorkoutList from "@/components/workouts/workout-list";
import WorkoutStatsCards from "@/components/workouts/workout-stats-cards";
import {
  calculateWorkoutStats,
  getWorkoutsByRange,
} from "@/data/workouts.data";
import useDateRangeStore from "@/store/date-range-store";
import { RiRunLine } from "@remixicon/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { format, subDays } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export const Route = createLazyFileRoute("/_layout/workouts")({
  component: Workouts,
});

function Workouts() {
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const [activeTab, setActiveTab] = useState("all");
  const [workouts, setWorkouts] = useState([]);

  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    const data = getWorkoutsByRange(dateRange);
    setWorkouts(data);
  }, [dateRange]);

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
            <PageDescription className="hidden sm:block">
              A breakdown of all recorded workouts.
            </PageDescription>
          </PageHeaderInfo>
        </PageHeaderContent>
        <PageQuickActions>
          <DateRangeSelector />
        </PageQuickActions>
      </PageHeader>

      <div className="container">
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

        <h2 className="mb-6 text-title-h4 font-medium">{dateHeader}</h2>

        <WorkoutStatsCards stats={stats} />

        <WorkoutList workouts={filteredWorkouts} />
      </div>
    </>
  );
}
