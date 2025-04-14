"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  calculateHeartRateMetrics,
  getHeartRateDataByRange,
} from "@/components/widgets/heart-rate.data";
import useDateRangeStore from "@/store/date-range-store";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_CONFIG = {
  heartRate: {
    label: "Heart Rate",
  },
};

export default function HeartRate() {
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const chartData = getHeartRateDataByRange(dateRange);
  const metrics = calculateHeartRateMetrics(chartData);
  const today = new Date();

  // Format date range based on selected range
  const getFormattedDateRange = () => {
    switch (dateRange) {
      case "today":
        return format(today, "EEEE, MMMM d, yyyy");
      case "this-week": {
        const weekStart = startOfWeek(today, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
        return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
      }
      case "this-month": {
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        return `${format(monthStart, "MMMM d")} - ${format(monthEnd, "d, yyyy")}`;
      }
      case "this-year": {
        const yearStart = startOfYear(today);
        const yearEnd = endOfYear(today);
        return `${format(yearStart, "MMM d")} - ${format(yearEnd, "MMM d, yyyy")}`;
      }
      default:
        return format(today, "EEEE, MMMM d, yyyy");
    }
  };

  const formattedDate = getFormattedDateRange();

  // Determine which data key to use for X-axis based on date range
  const getXAxisDataKey = () => {
    switch (dateRange) {
      case "today":
        return "time";
      case "this-week":
        return "day";
      case "this-month":
        return "week";
      case "this-year":
        return "month";
      default:
        return "time";
    }
  };

  // Use memoization to prevent unnecessary recalculations
  const chartContent = useMemo(
    () => (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey={getXAxisDataKey()}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis
            domain={[50, 200]}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}`}
            width={30}
            ticks={[50, 100, 150, 200]}
          />
          <Tooltip
            content={(props) => {
              const { active, payload } = props;
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                const xLabel = data[getXAxisDataKey()];
                return (
                  <div className="shadow-sm rounded-md border border-stroke-soft-200 bg-bg-white-0 p-2">
                    <div className="text-label-sm font-medium">{xLabel}</div>
                    <div className="text-label-xs text-text-sub-600">
                      Range: {data.min}-{data.max} {metrics.unit}
                    </div>
                    <div className="text-label-xs">
                      Avg: {data.value} {metrics.unit}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--red-500)"
            fill="var(--red-100)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="min"
            strokeOpacity={0}
            fillOpacity={0}
          />
          <Area
            type="monotone"
            dataKey="max"
            strokeOpacity={0}
            fillOpacity={0}
          />
        </AreaChart>
      </ResponsiveContainer>
    ),
    [chartData, dateRange],
  ); // Recalculate when data or date range changes

  return (
    <Card className="grow overflow-y-auto">
      <CardHeader>
        <CardTitle>Heart Rate</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Range Display */}
        <div>
          <h3 className="mb-2 text-label-sm font-medium">RANGE</h3>
          <h2 className="mb-2 flex items-baseline gap-2">
            <span className="text-3xl font-medium text-red-600">
              {metrics.min}–{metrics.max}
            </span>
            <span className="text-paragraph-sm text-text-sub-600">
              {metrics.unit}
            </span>
          </h2>
          <div className="text-label-sm text-text-sub-600">
            Average: {metrics.average} {metrics.unit} &ensp; Resting rate:{" "}
            {metrics.min} {metrics.unit}
          </div>
        </div>

        {/* Heart Rate Chart */}
        <div className="h-60">
          <ChartContainer config={CHART_CONFIG}>{chartContent}</ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
