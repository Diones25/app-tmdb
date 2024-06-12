import { useQuery } from "@tanstack/react-query"
import { geMoviesUpcoming, getMovieDetails, getMoviesPopulares, getPersonsPopulares, getSeriesPopulares } from "./api";
import { MovieDetail } from "@/types/MovieDetail";

export const useMoviesPopulares = () => {
  const query = useQuery({
    queryKey: ['moviesPopulares'],
    queryFn: getMoviesPopulares
  });

  return query;
}

export const useMoviesUpcoming = () => {
  const query = useQuery({
    queryKey: ['moviesUpcoming'],
    queryFn: geMoviesUpcoming
  });

  return query;
}

export const useSeriesPopulares = () => {
  const query = useQuery({
    queryKey: ['seriesPopulares'],
    queryFn: getSeriesPopulares
  });

  return query;
}

export const usePersonsPopulares = () => {
  const query = useQuery({
    queryKey: ['personsPopulares'],
    queryFn: getPersonsPopulares
  });

  return query;
}

export const useMoviesDetails = (id: number) => {
  const query = useQuery({
    queryKey: ['movieDetails', id],
    queryFn: (): Promise<MovieDetail> => getMovieDetails(id)
  });

  return query;
}