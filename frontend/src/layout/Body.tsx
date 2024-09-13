import { Outlet } from "react-router-dom";

export const Body = () => {
  return (
    <main className="body">
      <Outlet />
    </main>
  );
};
