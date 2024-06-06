import AllMoviesKeywords from "@/components/AllMoviesKeywords";
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
    path: '/details/:id',
    Component() {
      return (
        <MoviesDetails />
      )
    }
  },
  {
    path: '/releases/details/:id',
    Component() {
      return (
        <MoviesDetails />
      )
    }
  },
  {
    path: '/series/details/:id',
    Component() {
      return (
        <MoviesDetails />
      )
    }
  },
  {
    path: '/keyword/:id/movie',
    Component() {
      return (
        <AllMoviesKeywords />
      )
    }
  }
]);

export default Router;