import { Suspense } from "react";
import { v4 } from "uuid";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import { routes } from "@/routes";
import { Layout } from "@/layout";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/*" element={<Layout />}>
      {routes.map(({ index, path, element }) => {
        const Element = element;
        return (
          <Route
            key={v4()}
            index={index}
            path={path}
            element={
              <Suspense fallback={null}>
                <Element />
              </Suspense>
            }
          />
        );
      })}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
