import { useQuery } from "@tanstack/react-query"
import { geMoviesUpcoming, getMoviesPopulares, getPersonsPopulares, getSeriesPopulares } from "./api";

export const useMoviesPopilares = () => {
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