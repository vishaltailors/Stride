"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getCurrentActivityMetrics } from "@/components/widgets/activity.data";
import { RadialBar, RadialBarChart } from "recharts";

export default function Activity() {
  const activityMetrics = getCurrentActivityMetrics();

  // Define gradient IDs
  const moveGradientId = "moveGradient";
  const exerciseGradientId = "exerciseGradient";
  const standGradientId = "standGradient";

  // Calculate percentages for the activity metrics
  const calculatePercentage = (current, goal) =>
    Math.min(100, Math.round((current / goal) * 100));

  // Format chart data for RadialBarChart
  const chartData = [
    {
      name: "Stand",
      value: calculatePercentage(
        activityMetrics.stand.current,
        activityMetrics.stand.goal,
      ),
      actualValue: activityMetrics.stand.current,
      unit: activityMetrics.stand.unit,
      fill: `url(#${standGradientId})`,
    },
    {
      name: "Exercise",
      value: calculatePercentage(
        activityMetrics.exercise.current,
        activityMetrics.exercise.goal,
      ),
      actualValue: activityMetrics.exercise.current,
      unit: activityMetrics.exercise.unit,
      fill: `url(#${exerciseGradientId})`,
    },
    {
      name: "Move",
      value: calculatePercentage(
        activityMetrics.move.current,
        activityMetrics.move.goal,
      ),
      actualValue: activityMetrics.move.current,
      unit: activityMetrics.move.unit,
      fill: `url(#${moveGradientId})`,
    },
  ];

  // Chart configuration
  const chartConfig = {
    move: {
      label: "Move",
      color: activityMetrics.move.color.replace("text-", ""),
    },
    exercise: {
      label: "Exercise",
      color: activityMetrics.exercise.color.replace("text-", ""),
    },
    stand: {
      label: "Stand",
      color: activityMetrics.stand.color.replace("text-", ""),
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Today</CardTitle>
        <CardDescription>
          Track how often you stand, how much you move, and how many minutes of
          exercise you do.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-label-sm text-text-sub-600">Move</h3>
              <div className="text-label-xl text-orange-600">
                {activityMetrics.move.current}{" "}
                <span className="text-label-md">
                  / {activityMetrics.move.goal} {activityMetrics.move.unit}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-label-sm text-text-sub-600">Exercise</h3>
              <div className="text-label-xl text-green-600">
                {activityMetrics.exercise.current}{" "}
                <span className="text-label-md">
                  / {activityMetrics.exercise.goal}{" "}
                  {activityMetrics.exercise.unit}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-label-sm text-text-sub-600">Stand</h3>
              <div className="text-label-xl text-sky-600">
                {activityMetrics.stand.current}{" "}
                <span className="text-label-md">
                  / {activityMetrics.stand.goal} {activityMetrics.stand.unit}
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <ChartContainer config={chartConfig} className="mx-auto size-44">
              <RadialBarChart
                data={chartData}
                innerRadius={20}
                outerRadius={80}
                barSize={16}
                startAngle={90}
                endAngle={-270}
              >
                <defs>
                  <linearGradient
                    id={moveGradientId}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="var(--red-400)" />
                    <stop offset="100%" stopColor="var(--orange-600)" />
                  </linearGradient>
                  <linearGradient
                    id={exerciseGradientId}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="var(--green-400)" />
                    <stop offset="100%" stopColor="var(--green-600)" />
                  </linearGradient>
                  <linearGradient
                    id={standGradientId}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="var(--sky-400)" />
                    <stop offset="100%" stopColor="var(--sky-600)" />
                  </linearGradient>
                </defs>
                <ChartTooltip
                  cursor={false}
                  content={(props) => {
                    const { payload } = props;
                    if (payload && payload.length > 0) {
                      const data = payload[0].payload;
                      return (
                        <div className="border-border shadow-sm rounded-md border bg-bg-white-0 p-2">
                          <div className="text-label-xs font-medium">
                            {data.name}
                          </div>
                          <div className="text-label-sm">
                            {data.actualValue} {data.unit}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <RadialBar dataKey="value" background cornerRadius={7} />
              </RadialBarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
