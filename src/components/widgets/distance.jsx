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
import {
  calculateTotalDistance,
  getDistanceDataByRange,
} from "@/components/widgets/distance.data";
import useDateRangeStore from "@/store/date-range-store";
import { RiRoadMapLine } from "@remixicon/react";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function Distance() {
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const chartData = getDistanceDataByRange(dateRange);
  const totalDistance = calculateTotalDistance(chartData);

  // Get current date
  const today = new Date();

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

  const distanceChartConfig = {
    distance: {
      label: "Distance",
      color: "var(--chart-3)",
    },
  };

  return (
    <Card className="grow overflow-y-auto">
      <CardHeader>
        <CardTitle>Distance</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="mb-2 text-label-sm font-medium">DISTANCE</h3>
          <h2 className="mb-2 font-medium text-sky-600">{totalDistance}KM</h2>
          <ChartContainer config={distanceChartConfig}>
            <BarChart data={chartData} barSize={12}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey={getXAxisDataKey()}
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
                width={40}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="distance"
                fill="var(--chart-3)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
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
