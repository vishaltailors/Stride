import { format, subDays } from "date-fns";

// Define workout types with their corresponding icons
export const workoutTypes = {
  "Functional Strength Training": {
    icon: "figure-strengthtraining.svg",
    color: "var(--chart-1)"
  },
  "Walking": {
    icon: "figure-run.svg",
    color: "var(--chart-2)"
  },
  "Running": {
    icon: "figure-run.svg",
    color: "var(--chart-3)"
  },
  "Indoor Cycling": {
    icon: "figure-indoor-cycle.svg",
    color: "var(--chart-4)"
  },
  "Outdoor Cycling": {
    icon: "figure-outdoor-cycle.svg",
    color: "var(--chart-5)"
  },
  "Swimming": {
    icon: "figure-pool-swim.svg",
    color: "var(--orange-600)"
  },
  "Elliptical": {
    icon: "figure-elliptical.svg",
    color: "var(--purple-600)"
  },
  "Mind and Body": {
    icon: "figure-mind-and-body.svg",
    color: "var(--teal-600)"
  },
  "Mixed Cardio": {
    icon: "figure-mixed-cardio.svg",
    color: "var(--blue-600)"
  }
};

// Generate workout data for today
export const generateTodayWorkouts = () => {
  return [
    {
      type: "Functional Strength Training",
      duration: 26,
      calories: 120,
      distance: null
    },
    {
      type: "Walking",
      duration: 8,
      calories: 52.8,
      distance: 0.76
    }
  ];
};

// Generate workout data for this week
export const generateWeekWorkouts = () => {
  const today = new Date();
  return [
    {
      date: format(today, "yyyy-MM-dd"),
      workouts: [
        {
          type: "Functional Strength Training",
          duration: 26,
          calories: 120,
          distance: null
        },
        {
          type: "Walking",
          duration: 8,
          calories: 52.8,
          distance: 0.76
        }
      ]
    },
    {
      date: format(subDays(today, 1), "yyyy-MM-dd"),
      workouts: [
        {
          type: "Running",
          duration: 32,
          calories: 320,
          distance: 4.2
        }
      ]
    },
    {
      date: format(subDays(today, 2), "yyyy-MM-dd"),
      workouts: [
        {
          type: "Indoor Cycling",
          duration: 45,
          calories: 380,
          distance: 15.3
        },
        {
          type: "Mind and Body",
          duration: 20,
          calories: 85,
          distance: null
        }
      ]
    },
    {
      date: format(subDays(today, 3), "yyyy-MM-dd"),
      workouts: []
    },
    {
      date: format(subDays(today, 4), "yyyy-MM-dd"),
      workouts: [
        {
          type: "Swimming",
          duration: 35,
          calories: 290,
          distance: 1.2
        }
      ]
    },
    {
      date: format(subDays(today, 5), "yyyy-MM-dd"),
      workouts: [
        {
          type: "Functional Strength Training",
          duration: 30,
          calories: 140,
          distance: null
        }
      ]
    },
    {
      date: format(subDays(today, 6), "yyyy-MM-dd"),
      workouts: [
        {
          type: "Outdoor Cycling",
          duration: 60,
          calories: 450,
          distance: 18.5
        }
      ]
    }
  ];
};

// Generate workout data for this month
export const generateMonthWorkouts = () => {
  // Simplified version - would typically have more data
  return generateWeekWorkouts().concat(
    Array.from({ length: 3 }, (_, weekIndex) => 
      Array.from({ length: 7 }, (_, dayIndex) => {
        const date = subDays(new Date(), 7 + weekIndex * 7 + dayIndex);
        return {
          date: format(date, "yyyy-MM-dd"),
          workouts: Math.random() > 0.4 ? [
            {
              type: Object.keys(workoutTypes)[Math.floor(Math.random() * Object.keys(workoutTypes).length)],
              duration: Math.floor(Math.random() * 60) + 15,
              calories: Math.floor(Math.random() * 400) + 50,
              distance: Math.random() > 0.3 ? parseFloat((Math.random() * 20).toFixed(2)) : null
            }
          ] : []
        };
      })
    ).flat()
  );
};

// Generate workout data for this year
export const generateYearWorkouts = () => {
  // Simplified version - would typically have more data
  return generateMonthWorkouts().concat(
    Array.from({ length: 11 }, (_, monthIndex) => {
      const month = new Date();
      month.setMonth(month.getMonth() - 1 - monthIndex);
      
      return {
        month: format(month, "MMM yyyy"),
        totalWorkouts: Math.floor(Math.random() * 20) + 5,
        totalCalories: Math.floor(Math.random() * 5000) + 1000
      };
    })
  );
};

// Get workout data based on date range
export const getWorkoutsByRange = (dateRange) => {
  switch (dateRange) {
    case "today":
      return generateTodayWorkouts();
    case "this-week":
      return generateWeekWorkouts();
    case "this-month":
      return generateMonthWorkouts();
    case "this-year":
      return generateYearWorkouts();
    default:
      return generateTodayWorkouts();
  }
};

// Calculate total calories burned from workouts
export const calculateTotalCalories = (workouts) => {
  // Handle different data structures based on date range
  if (Array.isArray(workouts) && workouts.length > 0) {
    // For today's data
    if (workouts[0].type) {
      return workouts.reduce((sum, workout) => sum + workout.calories, 0);
    }
    
    // For week/month data
    if (workouts[0].date) {
      return workouts.reduce((sum, day) => {
        return sum + day.workouts.reduce((daySum, workout) => daySum + workout.calories, 0);
      }, 0);
    }
  }
  
  return 0;
};
