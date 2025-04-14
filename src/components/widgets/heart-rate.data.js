// Generate heart rate data for today with min/max ranges
export const generateTodayHeartRateData = () => {
  return [
    { time: "12 AM", min: 62, max: 68, value: 65 },
    { time: "2 AM", min: 58, max: 65, value: 62 },
    { time: "4 AM", min: 56, max: 63, value: 60 },
    { time: "6 AM", min: 65, max: 84, value: 68 },
    { time: "8 AM", min: 70, max: 95, value: 75 },
    { time: "10 AM", min: 95, max: 125, value: 110 },
    { time: "12 PM", min: 145, max: 175, value: 168 },
    { time: "2 PM", min: 130, max: 163, value: 145 },
    { time: "4 PM", min: 90, max: 115, value: 102 },
    { time: "6 PM", min: 100, max: 120, value: 110 },
    { time: "8 PM", min: 80, max: 95, value: 88 },
    { time: "10 PM", min: 70, max: 85, value: 76 },
  ];
};

// Generate heart rate data for this week
export const generateWeekHeartRateData = () => {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return dayNames.map((day, index) => {
    const baseValue = 70 + Math.floor(Math.random() * 30);
    return {
      day,
      min: baseValue - 10 - Math.floor(Math.random() * 5),
      max: baseValue + 60 + Math.floor(Math.random() * 20),
      value: baseValue + 20 + Math.floor(Math.random() * 10)
    };
  });
};

// Generate heart rate data for this month
export const generateMonthHeartRateData = () => {
  const weekNames = ["Week 1", "Week 2", "Week 3", "Week 4"];
  return weekNames.map((week, index) => {
    const baseValue = 75 + Math.floor(Math.random() * 20);
    return {
      week,
      min: baseValue - 15,
      max: baseValue + 70,
      value: baseValue + 15
    };
  });
};

// Generate heart rate data for this year
export const generateYearHeartRateData = () => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return monthNames.map((month, index) => {
    const baseValue = 72 + Math.floor(Math.random() * 25);
    return {
      month,
      min: baseValue - 12,
      max: baseValue + 65,
      value: baseValue + 18
    };
  });
};

// Get heart rate data based on date range
export const getHeartRateDataByRange = (dateRange) => {
  switch (dateRange) {
    case "today":
      return generateTodayHeartRateData();
    case "this-week":
      return generateWeekHeartRateData();
    case "this-month":
      return generateMonthHeartRateData();
    case "this-year":
      return generateYearHeartRateData();
    default:
      return generateTodayHeartRateData();
  }
};

// Calculate heart rate metrics based on data
export const calculateHeartRateMetrics = (data) => {
  const allMins = data.map(item => item.min);
  const allMaxs = data.map(item => item.max);
  const allValues = data.map(item => item.value);
  
  return {
    current: data[data.length - 1].value,
    min: Math.min(...allMins),
    max: Math.max(...allMaxs),
    average: Math.round(allValues.reduce((sum, val) => sum + val, 0) / allValues.length),
    unit: "BPM",
    color: "text-red-500"
  };
};
