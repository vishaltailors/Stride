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
import { generateTodayActivityData } from "@/components/widgets/steps";
import { RiRoadMapLine } from "@remixicon/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function Distance() {
  const chartData = generateTodayActivityData();
  const totalDistance = chartData
    .reduce((sum, entry) => sum + entry.distance, 0)
    .toFixed(2);
  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const distanceChartConfig = {
    distance: {
      label: "Distance",
      color: "var(--chart-3)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distance</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="mb-2 text-label-sm font-medium">DISTANCE</h3>
          <h2 className="mb-2 font-medium text-sky-600">{totalDistance}KM</h2>
          <ChartContainer config={distanceChartConfig}>
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
                  tickFormatter={(value) => `${value.toFixed(2)}`}
                  domain={[0, "dataMax + 0.1"]}
                  width={30}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="distance"
                  fill="var(--chart-3)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex items-center text-label-sm">
        <div className="flex gap-2">
          <RiRoadMapLine className="size-6" />
          <span className="text-text-sub-600">
            Goal: 5.0 KM ({Math.round((totalDistance / 5) * 100)}% complete)
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
