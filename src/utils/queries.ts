import { useQuery } from "@tanstack/react-query"
import {
  geMoviesUpcoming,
  getMovieCredits,
  getMovieDetails,
  getMovieDetailsImages,
  getMovieDetailsVideoTrailer,
  getMovieDetailsVideos,
  getMovieExternalIds,
  getMovieKeywords,
  getMoviesPopulares,
  getPersonsPopulares,
  getSeriesPopulares
} from "./api";
import { MovieDetail } from "@/types/MovieDetail";
import { Key } from "@/types/Key";
import { FilePath } from "@/types/FilePath";
import { MovieCreditsArray } from "@/types/MovieCredits";
import { ExternalId } from "@/types/ExternalId";
import { Keyword } from "@/types/Keyword";

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
    queryFn: (): Promise<FilePath[]> => getMovieDetailsImages(id)
  });

  return query;
}

export const useMovieCredits = (id: number) => {
  const query = useQuery({
    queryKey: ['movieCredits', id],
    queryFn: (): Promise<MovieCreditsArray> => getMovieCredits(id)
  });

  return query;
}

export const useMovieExternalIds = (id: number) => {
  const query = useQuery({
    queryKey: ['movieExternalIds', id],
    queryFn: (): Promise<ExternalId> => getMovieExternalIds(id)
  });

  return query;
}

export const useMovieKeywords = (id: number) => {
  const query = useQuery({
    queryKey: ['movieKeywords', id],
    queryFn: (): Promise<Keyword> => getMovieKeywords(id)
  });

  return query;
}