import { useQuery } from "@tanstack/react-query"
import { getMoviesPopulares } from "./api";

export const useMoviesPopilares = () => {
  const query = useQuery({
    queryKey: ['moviesPopulares'],
    queryFn: getMoviesPopulares
  });

  return query;
}