import "../index.css";
import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";

// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/signin") {
      return;
    }

    const isAuthenticated = localStorage.getItem("stride-auth") === "true";

    if (!isAuthenticated) {
      throw redirect({
        to: "/signin",
      });
    }
  },
  component: () => (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
