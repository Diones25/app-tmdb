import { Genre, MovieDetail } from "@/types/MovieDetail";
import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
const api_key = "f5a4130ffbf5af6a0dc17e45671898d0";
const language = "pt-BR"

const api = axios.create({
  baseURL: baseURL,
  params: {
    api_key: api_key,
    language: language
  }
});

export const getMoviesPopulares = async () => {
  const response = await api.get('/movie/popular', {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);
      
      return {        
        results: parsedData.results.map((item: { id: any; poster_path: any; vote_average: any; title: any; release_date: any; }) => {
          return {
            id: item.id,
            poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
            vote_average: item.vote_average,            
            title: item.title,
            release_date: item.release_date
          }
        }),
        page: parsedData.page,
        total_pages: parsedData.total_pages,
        total_results: parsedData.total_results,
      }
    }]
  });
  return response.data;
}

export const getMovieDetails = async (id: number): Promise<MovieDetail> => {
  const response = await api.get(`/movie/${id}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        id: parsedData.id,
        title: parsedData.title,
        backdrop_path: parsedData.backdrop_path,
        poster_path: parsedData.poster_path,
        release_date: parsedData.release_date,
        runtime: parsedData.runtime,
        vote_average: parsedData.vote_average,
        tagline: parsedData.tagline,
        overview: parsedData.overview,
        genres: parsedData.genres.map((item: Genre) => item.name)
      }
    }]
  });
  return response.data;
}

export const getMovieVideos = async (id: number) => {
  const response = await api.get(`/movie/${id}/videos`);
  return response.data.results;
}

export const geMoviesUpcoming = async () => {
  const response = await api.get('/movie/upcoming', {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: { id: any; poster_path: any; vote_average: any; title: any; release_date: any; }) => {
          return {
            id: item.id,
            poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
            vote_average: item.vote_average,
            title: item.title,
            release_date: item.release_date
          }
        }),
        page: parsedData.page,
        total_pages: parsedData.total_pages,
        total_results: parsedData.total_results,
      }
    }]
  });
  return response.data;
}

export const getSeriesPopulares = async () => {
  const response = await api.get('/tv/popular', {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: { id: any; poster_path: any; vote_average: any; title: any; release_date: any; }) => {
          return {
            id: item.id,
            poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
            vote_average: item.vote_average,
            title: item.title,
            release_date: item.release_date
          }
        }),
        page: parsedData.page,
        total_pages: parsedData.total_pages,
        total_results: parsedData.total_results,
      }
    }]
  });
  return response.data;
}

export const getPersonsPopulares = async () => {
  const response = await api.get('/person/popular');
  return response.data;
}