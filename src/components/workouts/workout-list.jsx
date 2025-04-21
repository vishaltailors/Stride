import WorkoutCard from "./workout-card";
import EmptyState from "@/components/shared/empty-state";

export default function WorkoutList({ workouts }) {
  if (!workouts.length) {
    return <EmptyState message="No workouts found for the selected filter" />;
  }
  return (
    <div className="space-y-4">
      {workouts.map((workout, index) => (
        <WorkoutCard
          key={`${workout.type}-${index}`}
          workout={workout}
          index={index}
        />
      ))}
    </div>
  );
}
