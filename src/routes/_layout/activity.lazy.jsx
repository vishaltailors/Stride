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
  getActivityDataByRange,
  getCurrentActivityMetrics,
} from "@/components/widgets/activity.data";
import { RiArrowDownLine, RiArrowUpLine, RiRunLine } from "@remixicon/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createLazyFileRoute("/_layout/activity")({
  component: Activity,
});

function Activity() {
  const [dateRange, setDateRange] = useState("today");
  const [activityData, setActivityData] = useState([]);
  const activityMetrics = getCurrentActivityMetrics();

  // Update data when date range changes
  useEffect(() => {
    const data = getActivityDataByRange(dateRange);
    setActivityData(data);
  }, [dateRange]);

  // Handle date range change
  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  // Format data keys based on date range
  const getDataKey = () => {
    switch (dateRange) {
      case "today":
        return "displayHour";
      case "this-week":
        return "day";
      case "this-month":
        return "week";
      case "this-year":
        return "month";
      default:
        return "displayHour";
    }
  };

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <SidebarTrigger />
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
          <DateRangeSelector onChange={handleDateRangeChange} />
        </PageQuickActions>
      </PageHeader>
      <div className="container grid grid-cols-1 gap-6 py-6 md:grid-cols-3">
        {/* Move Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-label-md font-medium">Move</CardTitle>
            <div className="text-label-lg text-orange-600">
              {activityMetrics.move.current}/{activityMetrics.move.goal}{" "}
              {activityMetrics.move.unit}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <XAxis dataKey={getDataKey()} tick={{ fontSize: 10 }} />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                    content={(props) => {
                      const { payload } = props;
                      if (payload && payload.length > 0) {
                        return (
                          <div className="border-border shadow-sm rounded-md border bg-bg-white-0 p-2">
                            <div className="text-label-sm">
                              {payload[0].payload[getDataKey()]}:{" "}
                              {payload[0].value} {activityMetrics.move.unit}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="move"
                    fill="var(--orange-500)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-label-sm text-text-sub-600">
              {dateRange === "today" ? "Total: 2,014 Kcal" : ""}
            </div>
          </CardContent>
        </Card>

        {/* Exercise Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-label-md font-medium">
              Exercise
            </CardTitle>
            <div className="text-label-lg text-green-600">
              {activityMetrics.exercise.current}/{activityMetrics.exercise.goal}{" "}
              {activityMetrics.exercise.unit}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <XAxis dataKey={getDataKey()} tick={{ fontSize: 10 }} />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                    content={(props) => {
                      const { payload } = props;
                      if (payload && payload.length > 0) {
                        return (
                          <div className="border-border shadow-sm rounded-md border bg-bg-white-0 p-2">
                            <div className="text-label-sm">
                              {payload[0].payload[getDataKey()]}:{" "}
                              {payload[0].value} {activityMetrics.exercise.unit}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="exercise"
                    fill="var(--green-500)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-label-sm text-text-sub-600">
              {dateRange === "today" ? "Total: 2h 30m" : ""}
            </div>
          </CardContent>
        </Card>

        {/* Stand Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-label-md font-medium">Stand</CardTitle>
            <div className="text-label-lg text-sky-600">
              {activityMetrics.stand.current}/{activityMetrics.stand.goal}{" "}
              {activityMetrics.stand.unit}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <XAxis dataKey={getDataKey()} tick={{ fontSize: 10 }} />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                    content={(props) => {
                      const { payload } = props;
                      if (payload && payload.length > 0) {
                        return (
                          <div className="border-border shadow-sm rounded-md border bg-bg-white-0 p-2">
                            <div className="text-label-sm">
                              {payload[0].payload[getDataKey()]}:{" "}
                              {payload[0].value} {activityMetrics.stand.unit}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="stand"
                    fill="var(--sky-500)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-label-sm text-text-sub-600">
              {dateRange === "today" ? "0 idle hours" : ""}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends Section */}
      <div className="container mb-12 mt-8">
        <h1 className="text-title-h5">Trends</h1>

        <div className="mb-6">
          <h2 className="text-2xl">
            Almost all your trends are looking good, Vishal. Incredible! Don't
            stop now.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* First Row */}
          <Card>
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-weak-50">
                <RiArrowUpLine className="text-teal-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-text-sub-400">Stand</div>
                <div className="text-xl font-medium text-teal-600">6HR/DAY</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-weak-50">
                <RiArrowDownLine className="text-red-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-text-sub-400">Move</div>
                <div className="text-xl font-medium text-red-600">
                  298KCAL/DAY
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-weak-50">
                <RiArrowUpLine className="text-sky-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-text-sub-400">Distance</div>
                <div className="text-xl font-medium text-sky-600">
                  2.1KM/DAY
                </div>
              </div>
            </div>
          </Card>

          {/* Second Row */}
          <Card>
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-weak-50">
                <RiArrowDownLine className="text-purple-400" size={24} />
              </div>
              <div>
                <div className="text-sm text-text-sub-400">Walking Pace</div>
                <div className="text-xl font-medium text-purple-400">
                  14:05/KM
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-weak-50">
                <RiArrowUpLine className="text-green-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-text-sub-400">Exercise</div>
                <div className="text-xl font-medium text-green-600">
                  41MIN/DAY
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-weak-50">
                <RiArrowUpLine className="text-yellow-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-text-sub-400">Stand Minutes</div>
                <div className="text-xl font-medium text-yellow-600">
                  12MIN/HR
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Trends (replacing Needs More Data) */}
          <Card>
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-weak-50">
                <RiArrowUpLine className="text-orange-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-text-sub-400">Cardio Fitness</div>
                <div className="text-xl font-medium text-orange-600">
                  32.5 VO2MAX
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-weak-50">
                <RiArrowDownLine className="text-pink-400" size={24} />
              </div>
              <div>
                <div className="text-sm text-text-sub-400">Running Pace</div>
                <div className="text-xl font-medium text-pink-400">6:18/KM</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-weak-50">
                <RiArrowDownLine className="text-blue-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-text-sub-400">
                  Resting Heart Rate
                </div>
                <div className="text-xl font-medium text-blue-600">72 BPM</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-sm text-text-sub-500 mt-8">
          <p>
            Trends looks at your activity from the past 90 days and compares it
            to the last year. If you're keeping up or improving, you'll see an
            upward arrow. If not, it'll point down. You're doing great in some
            areas, but there's room for improvement in others.
          </p>
        </div>
      </div>
    </>
  );
}
