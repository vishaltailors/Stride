"use client";

import { Button, ButtonIcon } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { TransitionPanel } from "@/components/ui/transition-panel";
import { getCurrentActivityMetrics } from "@/components/widgets/activity.data";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Activity() {
  const activityMetrics = getCurrentActivityMetrics();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const cardRef = useRef(null);

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

  // Mock data for detailed view
  const mockTimeData = [
    { time: "12:00", move: 0, exercise: 0, stand: 0 },
    { time: "14:00", move: 10, exercise: 5, stand: 1 },
    { time: "16:00", move: 30, exercise: 15, stand: 1 },
    { time: "18:00", move: 80, exercise: 25, stand: 2 },
    { time: "20:00", move: 120, exercise: 30, stand: 2 },
    { time: "22:00", move: 267, exercise: 36, stand: 3 },
  ];

  // Get the height of the main view to maintain consistent height
  const [cardHeight, setCardHeight] = useState(0);

  // Update card height when component mounts
  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.clientHeight);
    }
  }, []);

  const handleViewChange = (newIndex) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  // Transition panel variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      height: cardHeight || "auto",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      height: cardHeight || "auto",
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      height: cardHeight || "auto",
    }),
  };

  // Transition configuration
  const transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  const mainView = (
    <div className="flex h-full flex-col overflow-hidden">
      <CardHeader>
        <CardTitle>Activity Today</CardTitle>
        <CardDescription>
          Track how often you stand, how much you move, and how many minutes of
          exercise you do.
        </CardDescription>
      </CardHeader>
      <CardContent className="grow space-y-6 overflow-auto">
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
      <CardFooter className="justify-end">
        <Button
          variant="neutral"
          mode="stroke"
          onClick={() => handleViewChange(1)}
        >
          More details <ButtonIcon as={RiArrowRightSLine} />
        </Button>
      </CardFooter>
    </div>
  );

  const detailedView = (
    <div className="flex h-full flex-col overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Activity Details
          <Button
            variant="neutral"
            mode="stroke"
            onClick={() => handleViewChange(0)}
          >
            <ButtonIcon as={RiArrowLeftSLine} />
          </Button>
        </CardTitle>
        <CardDescription>
          {format(new Date(), "EEEE, MMMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="grow space-y-6 overflow-auto">
        <div className="space-y-6">
          {/* Move Section */}
          <div>
            <div>
              <h3 className="text-label-md font-medium">Move</h3>
              <div className="text-label-lg text-orange-600">
                {activityMetrics.move.current}/{activityMetrics.move.goal}{" "}
                {activityMetrics.move.unit}
              </div>
            </div>
            <div className="mt-2 h-32">
              <BarChart
                data={mockTimeData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                  content={(props) => {
                    const { payload } = props;
                    if (payload && payload.length > 0) {
                      return (
                        <div className="border-border shadow-sm rounded-md border bg-bg-white-0 p-2">
                          <div className="text-label-sm">
                            {payload[0].payload.time}: {payload[0].value}{" "}
                            {activityMetrics.move.unit}
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
            </div>
            <div className="mt-1 text-label-sm text-text-sub-600">
              Total: 2,014 KCAL
            </div>
          </div>

          {/* Exercise Section */}
          <div>
            <div>
              <h3 className="text-label-md font-medium">Exercise</h3>
              <div className="text-label-lg text-green-600">
                {activityMetrics.exercise.current}/
                {activityMetrics.exercise.goal} {activityMetrics.exercise.unit}
              </div>
            </div>
            <div className="mt-2 h-32">
              <BarChart
                data={mockTimeData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                  content={(props) => {
                    const { payload } = props;
                    if (payload && payload.length > 0) {
                      return (
                        <div className="border-border shadow-sm rounded-md border bg-bg-white-0 p-2">
                          <div className="text-label-sm">
                            {payload[0].payload.time}: {payload[0].value}{" "}
                            {activityMetrics.exercise.unit}
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
            </div>
            <div className="mt-1 text-label-sm text-text-sub-600">
              Total: 2h 30m
            </div>
          </div>

          {/* Stand Section */}
          <div>
            <div>
              <h3 className="text-label-md font-medium">Stand</h3>
              <div className="text-label-lg text-sky-600">
                {activityMetrics.stand.current}/{activityMetrics.stand.goal}{" "}
                {activityMetrics.stand.unit}
              </div>
            </div>
            <div className="mt-2 h-32">
              <BarChart
                data={mockTimeData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                  content={(props) => {
                    const { payload } = props;
                    if (payload && payload.length > 0) {
                      return (
                        <div className="border-border shadow-sm rounded-md border bg-bg-white-0 p-2">
                          <div className="text-label-sm">
                            {payload[0].payload.time}: {payload[0].value}{" "}
                            {activityMetrics.stand.unit}
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
            </div>
            <div className="mt-1 text-label-sm text-text-sub-600">
              0 idle hours
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );

  return (
    <Card
      className="flex grow flex-col overflow-y-auto overflow-x-hidden"
      ref={cardRef}
    >
      <div style={{ minHeight: cardHeight || "auto" }}>
        <TransitionPanel
          activeIndex={activeIndex}
          variants={variants}
          transition={transition}
          custom={direction}
        >
          {[mainView, detailedView]}
        </TransitionPanel>
      </div>
    </Card>
  );
}
