import { format, subDays } from "date-fns";
import { workoutTypes } from "@/components/widgets/workouts.data";

// Generate workout data for today
export const generateTodayWorkouts = () => {
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");
  const dayOfWeek = format(today, "EEEE");
  
  // Generate 1-3 workouts for today
  const workoutCount = Math.floor(Math.random() * 3) + 1;
  const workouts = [];
  const types = Object.keys(workoutTypes);
  
  for (let i = 0; i < workoutCount; i++) {
    const workoutType = types[Math.floor(Math.random() * types.length)];
    const duration = Math.floor(Math.random() * 60) + 15; // 15-75 minutes
    const calories = Math.floor(Math.random() * 300) + 30; // 30-330 calories
    const hasDistance = [
      "Walking",
      "Running",
      "Indoor Cycling",
      "Outdoor Cycling",
    ].includes(workoutType);
    
    workouts.push({
      type: workoutType,
      duration,
      calories,
      distance: hasDistance
        ? parseFloat((Math.random() * 5 + 0.5).toFixed(2))
        : null,
      date: formattedDate,
      dayOfWeek,
    });
  }
  
  return workouts;
};

// Generate workout data for this week
export const generateWeekWorkouts = () => {
  const today = new Date();
  const workouts = [];
  
  // Generate data for the last 7 days
  for (let i = 0; i < 7; i++) {
    const date = subDays(today, i);
    const formattedDate = format(date, "yyyy-MM-dd");
    const dayOfWeek = format(date, "EEEE");
    
    // Generate 0-2 workouts for each day
    const workoutCount = Math.floor(Math.random() * 3);
    const types = Object.keys(workoutTypes);
    
    for (let j = 0; j < workoutCount; j++) {
      const workoutType = types[Math.floor(Math.random() * types.length)];
      const duration = Math.floor(Math.random() * 60) + 15; // 15-75 minutes
      const calories = Math.floor(Math.random() * 300) + 30; // 30-330 calories
      const hasDistance = [
        "Walking",
        "Running",
        "Indoor Cycling",
        "Outdoor Cycling",
      ].includes(workoutType);
      
      workouts.push({
        type: workoutType,
        duration,
        calories,
        distance: hasDistance
          ? parseFloat((Math.random() * 5 + 0.5).toFixed(2))
          : null,
        date: formattedDate,
        dayOfWeek,
      });
    }
  }
  
  return workouts;
};

// Generate workout data for this month
export const generateMonthWorkouts = () => {
  const today = new Date();
  const workouts = [];
  
  // Generate data for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = subDays(today, i);
    const formattedDate = format(date, "yyyy-MM-dd");
    const dayOfWeek = format(date, "EEEE");
    
    // Generate 0-2 workouts for each day (with some days having no workouts)
    const workoutCount = Math.random() > 0.4 ? Math.floor(Math.random() * 2) + 1 : 0;
    const types = Object.keys(workoutTypes);
    
    for (let j = 0; j < workoutCount; j++) {
      const workoutType = types[Math.floor(Math.random() * types.length)];
      const duration = Math.floor(Math.random() * 60) + 15; // 15-75 minutes
      const calories = Math.floor(Math.random() * 300) + 30; // 30-330 calories
      const hasDistance = [
        "Walking",
        "Running",
        "Indoor Cycling",
        "Outdoor Cycling",
      ].includes(workoutType);
      
      workouts.push({
        type: workoutType,
        duration,
        calories,
        distance: hasDistance
          ? parseFloat((Math.random() * 5 + 0.5).toFixed(2))
          : null,
        date: formattedDate,
        dayOfWeek,
      });
    }
  }
  
  return workouts;
};

// Generate workout data for this year
export const generateYearWorkouts = () => {
  const today = new Date();
  const workouts = [];
  
  // Generate data for each month of the year (12 months)
  for (let i = 0; i < 12; i++) {
    // For each month, generate 5-15 workouts spread across the month
    const monthWorkoutCount = Math.floor(Math.random() * 10) + 5;
    const types = Object.keys(workoutTypes);
    
    for (let j = 0; j < monthWorkoutCount; j++) {
      // Random day within the month
      const daysInMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 0).getDate();
      const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
      const date = new Date(today.getFullYear(), today.getMonth() - i, randomDay);
      
      const formattedDate = format(date, "yyyy-MM-dd");
      const dayOfWeek = format(date, "EEEE");
      
      const workoutType = types[Math.floor(Math.random() * types.length)];
      const duration = Math.floor(Math.random() * 60) + 15; // 15-75 minutes
      const calories = Math.floor(Math.random() * 300) + 30; // 30-330 calories
      const hasDistance = [
        "Walking",
        "Running",
        "Indoor Cycling",
        "Outdoor Cycling",
      ].includes(workoutType);
      
      workouts.push({
        type: workoutType,
        duration,
        calories,
        distance: hasDistance
          ? parseFloat((Math.random() * 5 + 0.5).toFixed(2))
          : null,
        date: formattedDate,
        dayOfWeek,
      });
    }
  }
  
  // Sort workouts by date (most recent first)
  workouts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return workouts;
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
      return generateWeekWorkouts();
  }
};

// Calculate workout statistics
export const calculateWorkoutStats = (workouts) => {
  if (!workouts || workouts.length === 0) {
    return {
      totalWorkouts: 0,
      totalTime: "0:00:00",
      totalCalories: 0,
      avgTime: "0:00:00",
      avgCalories: 0,
    };
  }
  
  const totalWorkouts = workouts.length;
  
  // Calculate total time in hours:minutes:seconds format
  const totalMinutes = workouts.reduce(
    (sum, workout) => sum + workout.duration,
    0
  );
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.floor((totalMinutes * 60) % 60);
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  
  // Calculate total calories
  const totalCalories = workouts.reduce(
    (sum, workout) => sum + workout.calories,
    0
  );
  
  // Calculate average time and calories per workout
  const avgMinutes = totalWorkouts > 0 ? Math.floor(totalMinutes / totalWorkouts) : 0;
  const avgSeconds = totalWorkouts > 0 ? Math.floor(((totalMinutes / totalWorkouts) % 1) * 60) : 0;
  const avgTime = `0:${avgMinutes.toString().padStart(2, "0")}:${avgSeconds.toString().padStart(2, "0")}`;
  
  const avgCalories = totalWorkouts > 0 ? Math.floor(totalCalories / totalWorkouts) : 0;
  
  return {
    totalWorkouts,
    totalTime: formattedTime,
    totalCalories,
    avgTime,
    avgCalories,
  };
};
