// Mock data for the activity widget
// This file provides data functions for the activity widget

// Generate activity data for today with hourly breakdown
const generateTodayActivityData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return hours.map(hour => {
    // Random values that build up throughout the day
    const hourFactor = Math.min(1, hour / 23);
    const randomFactor = () => 0.7 + Math.random() * 0.6;
    
    return {
      hour,
      displayHour: `${hour}:00`,
      move: Math.round(480 * hourFactor * randomFactor()),
      exercise: Math.round(50 * hourFactor * randomFactor()),
      stand: Math.round(8 * hourFactor * randomFactor()),
    };
  });
};

// Generate weekly activity data
const generateWeeklyActivityData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return days.map(day => {
    return {
      day,
      move: Math.round(450 + Math.random() * 100),
      exercise: Math.round(45 + Math.random() * 20),
      stand: Math.round(7 + Math.random() * 5),
    };
  });
};

// Generate monthly activity data
const generateMonthlyActivityData = () => {
  return Array.from({ length: 4 }, (_, i) => {
    const weekNum = i + 1;
    
    return {
      week: `Week ${weekNum}`,
      move: Math.round(2800 + Math.random() * 700),
      exercise: Math.round(280 + Math.random() * 80),
      stand: Math.round(50 + Math.random() * 20),
    };
  });
};

// Generate yearly activity data
const generateYearlyActivityData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map(month => {
    return {
      month,
      move: Math.round(12000 + Math.random() * 3000),
      exercise: Math.round(1200 + Math.random() * 400),
      stand: Math.round(220 + Math.random() * 80),
    };
  });
};

// Get activity data based on selected date range
export const getActivityDataByRange = (dateRange) => {
  switch (dateRange) {
    case 'today':
      return generateTodayActivityData();
    case 'this-week':
      return generateWeeklyActivityData();
    case 'this-month':
      return generateMonthlyActivityData();
    case 'this-year':
      return generateYearlyActivityData();
    default:
      return generateTodayActivityData();
  }
};

// Calculate current activity metrics
export const getCurrentActivityMetrics = () => {
  // These would typically come from an API or real-time data
  // For now, we'll use the mock data from the UI
  return {
    move: {
      current: 480,
      goal: 650,
      unit: "kcal",
      color: "text-orange-600",
      ringColor: "from-orange-300 to-orange-600",
    },
    exercise: {
      current: 50,
      goal: 60,
      unit: "min",
      color: "text-green-600",
      ringColor: "from-green-300 to-green-600",
    },
    stand: {
      current: 8,
      goal: 12,
      unit: "hrs",
      color: "text-purple-600",
      ringColor: "from-purple-300 to-purple-600",
    }
  };
};
