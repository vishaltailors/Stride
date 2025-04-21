import FigureIndoorCycle from "@/assets/images/figure-indoor-cycle.svg";
import FigureMindAndBody from "@/assets/images/figure-mind-and-body.svg";
import FigureMixedCardio from "@/assets/images/figure-mixed-cardio.svg";
import FigureRun from "@/assets/images/figure-run.svg";
import FigureStrengthTraining from "@/assets/images/figure-strengthtraining.svg";
import { Card } from "@/components/ui/card";
import { format, parseISO } from "date-fns";

export default function WorkoutCard({ workout, index }) {
  let iconSrc;
  switch (workout.type) {
    case "Functional Strength Training":
      iconSrc = FigureStrengthTraining;
      break;
    case "Walking":
    case "Running":
      iconSrc = FigureRun;
      break;
    case "Indoor Cycling":
      iconSrc = FigureIndoorCycle;
      break;
    case "Mind and Body":
      iconSrc = FigureMindAndBody;
      break;
    default:
      iconSrc = FigureMixedCardio;
  }

  const displayDate =
    index === 0
      ? "Today"
      : index === 1
      ? "Yesterday"
      : format(parseISO(workout.date), "MMM d");

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-bg-weak-50">
            <img src={iconSrc} alt={workout.type} className="size-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-label-md font-medium">{workout.type}</h3>
              <span className="text-paragraph-sm text-text-sub-600">{displayDate}</span>
            </div>
            <div className="mt-1 flex gap-4">
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
      </div>
    </Card>
  );
}
