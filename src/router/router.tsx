import HomePage from "@/components/Home";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: '/',
    Component() {
      return (
        <HomePage />
      )
    }
  }
]);

export default Router;