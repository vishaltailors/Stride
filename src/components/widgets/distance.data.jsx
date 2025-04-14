export const generateTodayDistanceData = () => {
  const data = [];
  const distancePatterns = [
    0.05, 0.02, 0.01, 0.01, 0.02, 0.08, 0.25, 0.45, 0.3, 0.35, 0.4, 0.45, 0.5,
    0.48, 0.42, 0.45, 0.38, 0.4, 0.32, 0.25, 0.18, 0.12, 0.08, 0.05,
  ];

  for (let hour = 0; hour < 24; hour++) {
    data.push({
      hour: hour,
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

export const generateWeekDistanceData = () => {
  const data = [];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const distancePatterns = [3.2, 2.8, 3.7, 2.5, 3.9, 4.5, 3.4];

  for (let day = 0; day < 7; day++) {
    data.push({
      day: dayNames[day],
      distance: distancePatterns[day],
    });
  }
  return data;
};

export const generateMonthDistanceData = () => {
  const data = [];
  const weekNames = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const distancePatterns = [19.5, 23.8, 21.6, 25.2];

  for (let week = 0; week < 4; week++) {
    data.push({
      week: weekNames[week],
      distance: distancePatterns[week],
    });
  }
  return data;
};

export const generateYearDistanceData = () => {
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
  const distancePatterns = [
    82.5, 90.3, 97.8, 105.2, 112.5, 120.0, 127.5, 135.0, 142.5, 150.0, 157.5,
    165.0,
  ];

  for (let month = 0; month < 12; month++) {
    data.push({
      month: monthNames[month],
      distance: distancePatterns[month],
    });
  }
  return data;
};

export const getDistanceDataByRange = (dateRange) => {
  switch (dateRange) {
    case "today":
      return generateTodayDistanceData();
    case "this-week":
      return generateWeekDistanceData();
    case "this-month":
      return generateMonthDistanceData();
    case "this-year":
      return generateYearDistanceData();
    default:
      return generateTodayDistanceData();
  }
};

export const calculateTotalDistance = (data) => {
  return data.reduce((sum, entry) => sum + entry.distance, 0).toFixed(2);
};
