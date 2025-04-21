import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkoutStatsCards({ stats }) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-label-md font-medium">Workouts</CardTitle>
          <div className="text-label-lg text-primary-base">{stats.totalWorkouts}</div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-sub-600">
            You've completed {stats.totalWorkouts} workouts during this period.
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-label-md font-medium">Time</CardTitle>
          <div className="text-label-lg text-primary-base">{stats.totalTime}</div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-sub-600">
            Average: {stats.avgTime} per workout
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-label-md font-medium">Calories</CardTitle>
          <div className="text-label-lg text-primary-base">{stats.totalCalories.toLocaleString()} kcal</div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-sub-600">
            Average: {stats.avgCalories} kcal per workout
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
