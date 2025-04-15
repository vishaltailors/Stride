import Header from "@/components/shared/header";
import Activity from "@/components/widgets/activity";
import Distance from "@/components/widgets/distance";
import HealthTrio from "@/components/widgets/health-trio";
import HeartRate from "@/components/widgets/heart-rate";
import Steps from "@/components/widgets/steps";
import Workouts from "@/components/widgets/workouts";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultLayouts = {
  lg: [
    { i: "activity", x: 0, y: 0, w: 1, h: 1 },
    { i: "steps", x: 1, y: 0, w: 1, h: 1 },
    { i: "distance", x: 2, y: 0, w: 1, h: 1 },
    { i: "workouts", x: 0, y: 1, w: 1, h: 1 },
    { i: "heart-rate", x: 1, y: 1, w: 1, h: 1 },
    { i: "health-trio", x: 2, y: 1, w: 1, h: 1 },
  ],
  md: [
    { i: "activity", x: 0, y: 0, w: 1, h: 1 },
    { i: "steps", x: 1, y: 0, w: 1, h: 1 },
    { i: "distance", x: 0, y: 1, w: 2, h: 1 },
    { i: "workouts", x: 0, y: 2, w: 1, h: 1 },
    { i: "heart-rate", x: 1, y: 2, w: 1, h: 1 },
    { i: "health-trio", x: 2, y: 2, w: 1, h: 1 },
  ],
  sm: [
    { i: "activity", x: 0, y: 0, w: 1, h: 1 },
    { i: "steps", x: 0, y: 1, w: 1, h: 1 },
    { i: "distance", x: 0, y: 2, w: 1, h: 1 },
    { i: "workouts", x: 0, y: 3, w: 1, h: 1 },
    { i: "heart-rate", x: 0, y: 4, w: 1, h: 1 },
    { i: "health-trio", x: 0, y: 5, w: 1, h: 1 },
  ],
};

export const Route = createLazyFileRoute("/_layout/")({
  component: Index,
});

function Index() {
  const [isDraggable, setIsDraggable] = useState(false);
  const [layouts, setLayouts] = useState(defaultLayouts);
  const [currentLayout, setCurrentLayout] = useState(null);

  // Load saved layouts from localStorage on component mount
  useEffect(() => {
    try {
      const savedLayouts = localStorage.getItem("stride-widget-layouts");
      if (savedLayouts) {
        setLayouts(JSON.parse(savedLayouts));
      }
    } catch (error) {
      console.error("Error loading saved layouts:", error);
    }
  }, []);

  // Save layouts to localStorage when user confirms positions
  useEffect(() => {
    if (!isDraggable && currentLayout) {
      try {
        const updatedLayouts = {
          ...layouts,
          [currentLayout.breakpoint]: currentLayout.layout,
        };

        localStorage.setItem(
          "stride-widget-layouts",
          JSON.stringify(updatedLayouts),
        );

        setLayouts(updatedLayouts);
        setCurrentLayout(null);
      } catch (error) {
        console.error("Error saving layouts:", error);
      }
    }
  }, [isDraggable, currentLayout, layouts]);

  const handleLayoutChange = (layout, layouts) => {
    if (isDraggable) {
      // Get current breakpoint
      const breakpoint =
        Object.keys(layouts).find((key) => layouts[key] === layout) ||
        (window.innerWidth >= 1200
          ? "lg"
          : window.innerWidth >= 996
            ? "md"
            : "sm");

      setCurrentLayout({
        breakpoint,
        layout,
      });
    }
  };

  return (
    <>
      <Header isDraggable={isDraggable} setIsDraggable={setIsDraggable} />
      <div className="container py-6">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          cols={{ lg: 3, md: 2, sm: 1 }}
          rowHeight={470}
          width={1200}
          margin={[20, 20]}
          containerPadding={[0, 0]}
          isDraggable={isDraggable}
          isResizable={false}
          onLayoutChange={handleLayoutChange}
          useCSSTransforms={false}
        >
          <div key="activity">
            <Activity />
          </div>
          <div key="steps">
            <Steps />
          </div>
          <div key="distance">
            <Distance />
          </div>
          <div key="workouts">
            <Workouts />
          </div>
          <div key="heart-rate">
            <HeartRate />
          </div>
          <div key="health-trio">
            <HealthTrio />
          </div>
        </ResponsiveGridLayout>
      </div>
    </>
  );
}
