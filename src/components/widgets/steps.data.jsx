export const generateTodayStepsData = () => {
  const data = [];
  const stepPatterns = [
    100, 50, 20, 10, 30, 150, 500, 1200, 800, 950, 1100, 1300, 1500, 1400, 1200,
    1300, 1000, 1100, 900, 700, 500, 300, 200, 100,
  ];

  for (let hour = 0; hour < 24; hour++) {
    data.push({
      hour: hour,
      steps: stepPatterns[hour],
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

export const generateWeekStepsData = () => {
  const data = [];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const stepPatterns = [8500, 7200, 9800, 6500, 10200, 12000, 9000];

  for (let day = 0; day < 7; day++) {
    data.push({
      day: dayNames[day],
      steps: stepPatterns[day],
    });
  }
  return data;
};

export const generateMonthStepsData = () => {
  const data = [];
  const weekNames = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const stepPatterns = [52000, 63000, 58000, 67000];

  for (let week = 0; week < 4; week++) {
    data.push({
      week: weekNames[week],
      steps: stepPatterns[week],
    });
  }
  return data;
};

export const generateYearStepsData = () => {
  const data = [];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const stepPatterns = [
    220000, 240000, 260000, 280000, 300000, 320000, 340000, 360000, 380000,
    400000, 420000, 440000,
  ];

  for (let month = 0; month < 12; month++) {
    data.push({
      month: monthNames[month],
      steps: stepPatterns[month],
    });
  }
  return data;
};

export const getStepsDataByRange = (dateRange) => {
  switch (dateRange) {
    case "today":
      return generateTodayStepsData();
    case "this-week":
      return generateWeekStepsData();
    case "this-month":
      return generateMonthStepsData();
    case "this-year":
      return generateYearStepsData();
    default:
      return generateTodayStepsData();
  }
};

export const calculateTotalSteps = (data) => {
  return data.reduce((sum, entry) => sum + entry.steps, 0);
};
