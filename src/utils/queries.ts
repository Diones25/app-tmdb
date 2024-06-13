import { useQuery } from "@tanstack/react-query"
import { geMoviesUpcoming, getMovieDetails, getMovieDetailsImages, getMovieDetailsVideoTrailer, getMovieDetailsVideos, getMoviesPopulares, getPersonsPopulares, getSeriesPopulares } from "./api";
import { MovieDetail } from "@/types/MovieDetail";
import { Key } from "@/types/Key";
import { FilePath } from "@/types/FilePath";

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

export const useMovieDetailsVideos = (id: number) => {
  const query = useQuery({
    queryKey: ['movieDetailsVideos', id],
    queryFn: (): Promise<Key[]> => getMovieDetailsVideos(id)
  });

  return query;
}

export const useMovieDetailsVideoTrailer = (id: number) => {
  const query = useQuery({
    queryKey: ['movieDetailsVideoTrailer', id],
    queryFn: (): Promise<Key> => getMovieDetailsVideoTrailer(id)
  });

  return query;
}

export const useMovieDetailsImages = (id: number) => {
  const query = useQuery({
    queryKey: ['movieDetailsImages', id],
    queryFn: (): Promise<FilePath> => getMovieDetailsImages(id)
  });

  return query;
}