import { lazy } from "react";
import { MeasureStep } from "@/pages/MeasureStep/MeasureStep";

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
  {
    path: ":id/measures/new",
    element: MeasureStep,
  },
];
