import Header from "@/components/shared/header";
import Activity from "@/components/widgets/activity";
import Distance from "@/components/widgets/distance";
import Steps from "@/components/widgets/steps";
import Workouts from "@/components/widgets/workouts";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <div className="container grid grid-cols-3 gap-5 py-6">
        <Activity />
        <Steps />
        <Distance />
        <Workouts />
      </div>
    </>
  );
}
