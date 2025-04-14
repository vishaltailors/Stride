"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RiFootprintLine } from "@remixicon/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Generate mock data for today's steps and distance (hourly)
// Exported to be reused by the distance component
export const generateTodayActivityData = () => {
  const data = [];
  // Start with fewer steps in early morning, peak during day, then decrease
  const stepPatterns = [
    100, 50, 20, 10, 30, 150, 500, 1200, 800, 950, 1100, 1300, 1500, 1400, 1200,
    1300, 1000, 1100, 900, 700, 500, 300, 200, 100,
  ];

  // Distance in kilometers, roughly correlated with steps but not exactly proportional
  const distancePatterns = [
    0.05, 0.02, 0.01, 0.01, 0.02, 0.08, 0.25, 0.45, 0.3, 0.35, 0.4, 0.45, 0.5,
    0.48, 0.42, 0.45, 0.38, 0.4, 0.32, 0.25, 0.18, 0.12, 0.08, 0.05,
  ];

  for (let hour = 0; hour < 24; hour++) {
    data.push({
      hour: hour,
      steps: stepPatterns[hour],
      distance: distancePatterns[hour],
      displayHour:
        hour === 0
          ? "12 AM"
          : hour === 12
            ? "12 PM"
            : hour < 12
              ? `${hour} AM`
              : `${hour - 12} PM`,
    });
  }
  return data;
};

const chartData = generateTodayActivityData();

// Calculate total steps
const totalSteps = chartData.reduce((sum, entry) => sum + entry.steps, 0);

const stepsChartConfig = {
  steps: {
    label: "Steps",
    color: "var(--chart-1)",
  },
};

export default function Steps() {
  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Steps</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Steps Chart */}
        <div>
          <h3 className="mb-2 text-label-sm font-medium">COUNT</h3>
          <h2 className="mb-2 font-medium text-orange-600">
            {totalSteps.toLocaleString()}
          </h2>
          <ChartContainer config={stepsChartConfig}>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={chartData} barSize={12}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="displayHour"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  interval="preserveStartEnd"
                  minTickGap={30}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  domain={[0, "dataMax + 200"]}
                  width={30}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="steps"
                  fill="var(--chart-1)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex items-center text-label-sm">
        <div className="flex gap-2">
          <RiFootprintLine className="size-6" />
          <span className="text-text-sub-600">
            Goal: 10,000 steps ({Math.round(totalSteps / 100)}% complete)
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
