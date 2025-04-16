import { format, startOfWeek } from "date-fns";

// Weight data based on date range
export const getWeightData = (dateRange) => {
  switch (dateRange) {
    case "today":
      return {
        current: 65,
        unit: "kg",
        range: [55, 60, 65, 70, 75, 80, 85, 90],
      };
    case "this-week":
      return {
        current: 64.5,
        unit: "kg",
        range: [55, 60, 65, 70, 75, 80, 85, 90],
      };
    case "this-month":
      return {
        current: 66.2,
        unit: "kg",
        range: [55, 60, 65, 70, 75, 80, 85, 90],
      };
    case "this-year":
      return {
        current: 60,
        unit: "kg",
        range: [55, 60, 65, 70, 75, 80, 85, 90],
      };
    default:
      return {
        current: 65,
        unit: "kg",
        range: [55, 60, 65, 70, 75, 80, 85, 90],
      };
  }
};

// Water data based on date range
export const getWaterData = (dateRange) => {
  switch (dateRange) {
    case "today":
      return {
        current: 1200,
        goal: 1900,
        unit: "ml",
        percentage: 63,
        history: null,
      };
    case "this-week":
      return {
        current: 1450,
        goal: 1900,
        unit: "ml",
        percentage: 76,
        history: [
          { day: "Mon", amount: 1600 },
          { day: "Tue", amount: 1350 },
          { day: "Wed", amount: 1800 },
          { day: "Thu", amount: 1200 },
          { day: "Fri", amount: 1450 },
          { day: "Sat", amount: 1700 },
          { day: "Sun", amount: 1550 },
        ],
      };
    case "this-month":
      return {
        current: 1380,
        goal: 1900,
        unit: "ml",
        percentage: 73,
        history: [
          { day: "Week 1", amount: 1550 },
          { day: "Week 2", amount: 1650 },
          { day: "Week 3", amount: 1380 },
          { day: "Week 4", amount: 1420 },
        ],
      };
    case "this-year":
      return {
        current: 1520,
        goal: 1900,
        unit: "ml",
        percentage: 80,
        history: [
          { day: "Jan", amount: 1200 },
          { day: "Feb", amount: 1300 },
          { day: "Mar", amount: 1450 },
          { day: "Apr", amount: 1520 },
          { day: "May", amount: 1600 },
          { day: "Jun", amount: 1700 },
          { day: "Jul", amount: 1750 },
          { day: "Aug", amount: 1600 },
          { day: "Sep", amount: 1500 },
          { day: "Oct", amount: 1400 },
          { day: "Nov", amount: 1350 },
          { day: "Dec", amount: 1300 },
        ],
      };
    default:
      return {
        current: 1200,
        goal: 1900,
        unit: "ml",
        percentage: 63,
        history: null,
      };
  }
};

// Sleep data based on date range
export const getSleepData = (dateRange) => {
  switch (dateRange) {
    case "today":
      return [
        { time: "11:00", deepSleep: 0, rem: 0, lightSleep: 0, awake: 0 },
        { time: "11:30", deepSleep: 80, rem: 0, lightSleep: 0, awake: 0 },
        { time: "12:00", deepSleep: 90, rem: 0, lightSleep: 0, awake: 0 },
        { time: "12:30", deepSleep: 85, rem: 0, lightSleep: 0, awake: 0 },
        { time: "13:00", deepSleep: 10, rem: 50, lightSleep: 0, awake: 0 },
        { time: "13:30", deepSleep: 0, rem: 0, lightSleep: 40, awake: 0 },
        { time: "14:00", deepSleep: 0, rem: 0, lightSleep: 70, awake: 0 },
        { time: "14:30", deepSleep: 0, rem: 0, lightSleep: 0, awake: 30 },
        { time: "15:00", deepSleep: 0, rem: 0, lightSleep: 0, awake: 0 },
      ];
    case "this-week":
      return [
        { day: "Mon", deepSleep: 120, rem: 60, lightSleep: 180, awake: 20 },
        { day: "Tue", deepSleep: 100, rem: 70, lightSleep: 200, awake: 10 },
        { day: "Wed", deepSleep: 110, rem: 80, lightSleep: 170, awake: 15 },
        { day: "Thu", deepSleep: 90, rem: 75, lightSleep: 190, awake: 25 },
        { day: "Fri", deepSleep: 105, rem: 65, lightSleep: 185, awake: 30 },
        { day: "Sat", deepSleep: 130, rem: 85, lightSleep: 160, awake: 5 },
        { day: "Sun", deepSleep: 115, rem: 70, lightSleep: 175, awake: 10 },
      ];
    case "this-month":
      return [
        {
          week: "Week 1",
          deepSleep: 115,
          rem: 70,
          lightSleep: 180,
          awake: 15,
        },
        {
          week: "Week 2",
          deepSleep: 105,
          rem: 75,
          lightSleep: 185,
          awake: 20,
        },
        {
          week: "Week 3",
          deepSleep: 110,
          rem: 65,
          lightSleep: 175,
          awake: 25,
        },
        {
          week: "Week 4",
          deepSleep: 100,
          rem: 80,
          lightSleep: 190,
          awake: 10,
        },
      ];
    case "this-year":
      return [
        { month: "Jan", deepSleep: 100, rem: 60, lightSleep: 170, awake: 20 },
        { month: "Feb", deepSleep: 105, rem: 65, lightSleep: 175, awake: 15 },
        { month: "Mar", deepSleep: 110, rem: 70, lightSleep: 180, awake: 10 },
        { month: "Apr", deepSleep: 115, rem: 75, lightSleep: 185, awake: 5 },
        { month: "May", deepSleep: 120, rem: 80, lightSleep: 190, awake: 10 },
        { month: "Jun", deepSleep: 115, rem: 75, lightSleep: 185, awake: 15 },
        { month: "Jul", deepSleep: 110, rem: 70, lightSleep: 180, awake: 20 },
        { month: "Aug", deepSleep: 105, rem: 65, lightSleep: 175, awake: 25 },
        { month: "Sep", deepSleep: 100, rem: 60, lightSleep: 170, awake: 30 },
        { month: "Oct", deepSleep: 105, rem: 65, lightSleep: 175, awake: 25 },
        { month: "Nov", deepSleep: 110, rem: 70, lightSleep: 180, awake: 20 },
        { month: "Dec", deepSleep: 115, rem: 75, lightSleep: 185, awake: 15 },
      ];
    default:
      return [
        { time: "11:00", deepSleep: 0, rem: 0, lightSleep: 0, awake: 0 },
        { time: "11:30", deepSleep: 80, rem: 0, lightSleep: 0, awake: 0 },
        { time: "12:00", deepSleep: 90, rem: 0, lightSleep: 0, awake: 0 },
        { time: "12:30", deepSleep: 85, rem: 0, lightSleep: 0, awake: 0 },
        { time: "13:00", deepSleep: 10, rem: 50, lightSleep: 0, awake: 0 },
        { time: "13:30", deepSleep: 0, rem: 0, lightSleep: 40, awake: 0 },
        { time: "14:00", deepSleep: 0, rem: 0, lightSleep: 70, awake: 0 },
        { time: "14:30", deepSleep: 0, rem: 0, lightSleep: 0, awake: 30 },
        { time: "15:00", deepSleep: 0, rem: 0, lightSleep: 0, awake: 0 },
      ];
  }
};

// Helper function to format date range text
export const getDateRangeText = (dateRange, today) => {
  switch (dateRange) {
    case "today":
      return format(today, "EEEE, MMMM d, yyyy");
    case "this-week":
      return `Week of ${format(startOfWeek(today), "MMMM d")} - ${format(today, "MMMM d, yyyy")}`;
    case "this-month":
      return format(today, "MMMM yyyy");
    case "this-year":
      return format(today, "yyyy");
    default:
      return format(today, "EEEE, MMMM d, yyyy");
  }
};

// Chart colors for sleep data
export const sleepChartColors = {
  deepSleep: {
    fill: "url(#deepSleepGradient)",
    stroke: "transparent",
    gradient: {
      id: "deepSleepGradient",
      startColor: "#22c55e",
      startOpacity: 0.8,
      endColor: "#22c55e",
      endOpacity: 0.2,
    },
    legendColor: "#22c55e",
    label: "Deep Sleep",
  },
  rem: {
    fill: "url(#remGradient)",
    stroke: "transparent",
    gradient: {
      id: "remGradient",
      startColor: "#f97316",
      startOpacity: 0.8,
      endColor: "#f97316",
      endOpacity: 0.2,
    },
    legendColor: "#f97316",
    label: "REM",
  },
  lightSleep: {
    fill: "url(#lightSleepGradient)",
    stroke: "transparent",
    gradient: {
      id: "lightSleepGradient",
      startColor: "#facc15",
      startOpacity: 0.8,
      endColor: "#facc15",
      endOpacity: 0.2,
    },
    legendColor: "#facc15",
    label: "Light Sleep",
  },
  awake: {
    fill: "url(#awakeGradient)",
    stroke: "transparent",
    gradient: {
      id: "awakeGradient",
      startColor: "#a78bfa",
      startOpacity: 0.8,
      endColor: "#a78bfa",
      endOpacity: 0.2,
    },
    legendColor: "#a78bfa",
    label: "Awake",
  },
};

// Water chart colors
export const waterChartColors = {
  fill: "#47C2FF",
  radius: [4, 4, 0, 0],
};
