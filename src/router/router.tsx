import HomePage from "@/components/Home";
import MoviesDetails from "@/components/MoviesDetails";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: '/',
    Component() {
      return (
        <HomePage />
      )
    }
  },
  {
    path: '/details',
    Component() {
      return (
        <MoviesDetails />
      )
    }
  }
]);

export default Router;