import { RouterProvider } from "react-router-dom";
import { router } from "./presentation/router/router";

export const RectGpt = () => {
  return <RouterProvider router={router} />;
};
