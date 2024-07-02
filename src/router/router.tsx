import AllMoviesKeywords from "@/components/AllMoviesKeywords";
import HomePage from "@/components/Home";
import MoviesDetails from "@/components/MoviesDetails";
import PersonDetails from "@/components/PersonDetails";
import SeriesDetails from "@/components/SeriesDetails";
import SeriesSeasonsDetails from "@/components/SeriesSeasonsDetails";
import SeriesSeasonsEpisodeDetails from "@/components/SeriesSeasonsEpisodeDetails";
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
        <SeriesDetails />
      )
    }
  },
  {
    path: '/tv/:id/seasons',
    Component() {
      return (
        <SeriesSeasonsDetails />
      )
    }
  },
  {
    path: '/tv/:series_id/season/:season_number',
    Component() {
      return (
        <SeriesSeasonsEpisodeDetails />
      )
    }
  },
  {
    path: '/person/details/:id',
    Component() {
      return (
        <PersonDetails />
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