"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculateTotalCalories, getWorkoutsByRange, workoutTypes } from "@/components/widgets/workouts.data";
import useDateRangeStore from "@/store/date-range-store";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";

export default function Workouts() {
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const workoutsData = getWorkoutsByRange(dateRange);
  
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
  
  // Calculate total calories
  const totalCalories = dateRange === "this-year" && workoutsData.some(item => item.totalCalories)
    ? workoutsData.filter(item => item.totalCalories).reduce((sum, item) => sum + item.totalCalories, 0)
    : dateRange === "today" 
      ? workoutsData.reduce((sum, workout) => sum + workout.calories, 0)
      : calculateTotalCalories(workoutsData);
  
  // Get workouts to display (max 5)
  const getWorkoutsToDisplay = () => {
    if (dateRange === "today") {
      return workoutsData.slice(0, 5);
    } else if (dateRange === "this-week" || dateRange === "this-month") {
      // Flatten all workouts from all days, sort by most recent, and take up to 5
      const allWorkouts = [];
      
      workoutsData.forEach(day => {
        if (day.workouts && day.workouts.length > 0) {
          day.workouts.forEach(workout => {
            allWorkouts.push({
              ...workout,
              date: day.date
            });
          });
        }
      });
      
      // Sort by date (most recent first)
      allWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return allWorkouts.slice(0, 5);
    } else if (dateRange === "this-year") {
      // For yearly data, we'll show the most recent month's workouts
      // Filter out items that don't have workouts array
      const recentWorkouts = workoutsData
        .filter(item => item.workouts && item.workouts.length > 0)
        .slice(0, 5);
        
      // Flatten the workouts
      const allWorkouts = [];
      recentWorkouts.forEach(day => {
        day.workouts.forEach(workout => {
          allWorkouts.push({
            ...workout,
            date: day.date
          });
        });
      });
      
      return allWorkouts.slice(0, 5);
    }
    
    return [];
  };
  
  const workoutsToDisplay = getWorkoutsToDisplay();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workouts</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="mb-2 text-label-sm font-medium">CALORIES</h3>
          <h2 className="font-medium text-orange-600">
            {`${totalCalories.toLocaleString()} kilocalories`}
          </h2>
        </div>
        
        {/* Workouts List */}
        <div className="space-y-4">
          {workoutsToDisplay.map((workout, index) => {
            const workoutType = workoutTypes[workout.type];
            // Import images directly from assets folder
            const iconPath = new URL(`../../assets/images/${workoutType?.icon}`, import.meta.url).href;
            
            return (
              <div key={index} className="flex items-start gap-4">
                {/* Workout Icon */}
                <div 
                  className="flex-shrink-0 size-16 rounded-full bg-bg-weak-50 flex items-center justify-center"
                >
                  <img 
                    src={iconPath} 
                    alt={workout.type} 
                    className="size-10"
                  />
                </div>
                
                {/* Workout Details */}
                <div className="flex-1">
                  <h3 className="text-label-md font-medium">{workout.type}</h3>
                  
                  <div className="flex gap-4 mt-1">
                    <div>
                      <span className="text-label-sm text-text-sub-600">{workout.duration}min</span>
                    </div>
                    
                    <div>
                      <span className="text-label-sm text-text-sub-600">{workout.calories} kcal</span>
                    </div>
                    
                    {workout.distance && (
                      <div>
                        <span className="text-label-sm text-text-sub-600">{workout.distance} km</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {workoutsToDisplay.length === 0 && (
            <div className="text-center py-4 text-text-sub-600">
              No workouts for this period
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
