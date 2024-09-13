import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const ViewMeasures = lazy(() => import("./pages/ViewMeasures/ViewMeasures"));

export const routes = [
  {
    index: true,
    element: Home,
  },
  {
    path: ":id/measures",
    element: ViewMeasures,
  },
];
