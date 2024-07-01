import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  geMoviesUpcoming,
  getMovieCredits,
  getMovieDetails,
  getMovieDetailsImages,
  getMovieDetailsVideoTrailer,
  getMovieDetailsVideos,
  getMovieExternalIds,
  getMovieKeywords,
  getMovieRecommended,
  getMoviesPopulares,
  getPersonCredits,
  getPersonDetails,
  getPersonExternalIDs,
  getPersonsPopulares,
  getSerieCredits,
  getSerieDetailsImages,
  getSerieDetailsVideoTrailer,
  getSerieDetailsVideos,
  getSerieKeywords,
  getSerieRecommended,
  getSeriesDetails,
  getSeriesPopulares
} from "./api";
import { MovieDetail } from "@/types/MovieDetail";
import { Key } from "@/types/Key";
import { FilePath } from "@/types/FilePath";
import { MovieCreditsArray } from "@/types/MovieCredits";
import { ExternalId } from "@/types/ExternalId";
import { Keyword } from "@/types/Keyword";
import { MovieRecommended } from "@/types/MovieRecommended";
import { PersonCredits } from "@/types/PersonCredits";
import { PersonExternalIDs } from "@/types/PersonExternalIDs";
import { SerieDetails } from "@/types/SerieDetails";
import { SerieRecommended } from "@/types/SerieRecommended";
import { SerieCredits } from "@/types/SerieCredits";
import { KeywordSerie } from "@/types/KeywordSerie";

export const useMoviesPopulares = (page: number) => {
  const query = useQuery({
    queryKey: ['moviesPopulares', page],
    queryFn: () => getMoviesPopulares(page),
    placeholderData: keepPreviousData
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

export const useMovieRecommended = (id: number) => {
  const query = useQuery({
    queryKey: ['movieRecommended', id],
    queryFn: (): Promise<MovieRecommended> => getMovieRecommended(id)
  });

  return query;
}

export const useMoviesUpcoming = (page: number) => {
  const query = useQuery({
    queryKey: ['moviesUpcoming', page],
    queryFn: () => geMoviesUpcoming(page),
    placeholderData: keepPreviousData
  });

  return query;
}

export const useSeriesPopulares = (page: number) => {
  const query = useQuery({
    queryKey: ['seriesPopulares', page],
    queryFn: () => getSeriesPopulares(page),
    placeholderData: keepPreviousData
  });

  return query;
}

export const useSeriesDetails = (id: number) => {
  const query = useQuery({
    queryKey: ['seriesDetails', id],
    queryFn: (): Promise<SerieDetails> => getSeriesDetails(id)
  });

  return query;
}

export const useSerieDetailsVideos = (id: number) => {
  const query = useQuery({
    queryKey: ['serieDetailsVideos', id],
    queryFn: (): Promise<Key[]> => getSerieDetailsVideos(id)
  });

  return query;
}

export const useSerieDetailsVideoTrailer = (id: number) => {
  const query = useQuery({
    queryKey: ['serieDetailsVideoTrailer', id],
    queryFn: (): Promise<Key> => getSerieDetailsVideoTrailer(id)
  });

  return query;
}

export const useSerieDetailsImages = (id: number) => {
  const query = useQuery({
    queryKey: ['serieDetailsImages', id],
    queryFn: (): Promise<FilePath[]> => getSerieDetailsImages(id)
  });

  return query;
}

export const useSerieRecommended = (id: number) => {
  const query = useQuery({
    queryKey: ['serieRecommended', id],
    queryFn: (): Promise<SerieRecommended> => getSerieRecommended(id)
  });

  return query;
}

export const useSerieCredits = (id: number) => {
  const query = useQuery({
    queryKey: ['serieCredits', id],
    queryFn: (): Promise<SerieCredits> => getSerieCredits(id)
  });

  return query;
}

export const useSerieKeywords = (id: number) => {
  const query = useQuery({
    queryKey: ['serieKeywords', id],
    queryFn: (): Promise<KeywordSerie> => getSerieKeywords(id)
  });

  return query;
}

export const usePersonsPopulares = (page: number) => {
  const query = useQuery({
    queryKey: ['personsPopulares', page],
    queryFn: () => getPersonsPopulares(page),
    placeholderData: keepPreviousData
  });

  return query;
}

export const usePersonDetails = (id: number) => {
  const query = useQuery({
    queryKey: ['personDetails', id],
    queryFn: () => getPersonDetails(id)
  });

  return query;
}

export const usePersonCredits = (id: number) => {
  const query = useQuery({
    queryKey: ['personCredits', id],
    queryFn: (): Promise<PersonCredits> => getPersonCredits(id)
  });

  return query;
}

export const usePersonExternalIDs = (id: number) => {
  const query = useQuery({
    queryKey: ['personExternalIDs', id],
    queryFn: (): Promise<PersonExternalIDs> => getPersonExternalIDs(id)
  });

  return query;
}
