import Header from "@/components/shared/header";
import Distance from "@/components/widgets/distance";
import Steps from "@/components/widgets/steps";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <div className="container grid grid-cols-3 gap-5 py-6">
        <Steps />
        <Distance />
      </div>
    </>
  );
}
