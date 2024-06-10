import { ExternalId } from "@/types/ExternalId";
import { Keyword } from "@/types/Keyword";
import { Genre, MovieDetail } from "@/types/MovieDetail";
import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_APP_API_KEY;
const token = import.meta.env.VITE_APP_TOKEN;
const language = "pt-BR"

const api = axios.create({
  baseURL: baseURL,
  params: {
    api_key: api_key,
    language: language
  },
  headers: {    
    Authorization: token
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
        original_title: parsedData.original_title,
        status: parsedData.status,
        original_language: parsedData.original_language,
        budget: parsedData.budget,
        revenue: parsedData.revenue,
        genres: parsedData.genres.map((item: Genre) => item.name)
      }
    }]
  });
  return response.data;
}

export const getMovieDetailsVideos = async (id: number) => {
  const response = await api.get(`/movie/${id}/videos`);  
  return response.data.results;
}

export const getMovieDetailsImages = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/images`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWE0MTMwZmZiZjVhZjZhMGRjMTdlNDU2NzE4OThkMCIsInN1YiI6IjYxMzdhZTg3MDdhODA4MDA2MTQ1ZjdjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gJVXz5HjXwJ_ob0dyjxlCXuvIhoPITmPUSWfqX_q-qg'
    }
  };

  const response = await axios.get(url, options);
  const data = response.data.backdrops.map(item => {
    return {
      file_path: item.file_path
    }
  });
  return data;
}

export const getMovieRecommended = async (id: number) => {
  const response = await api.get(`/movie/${id}/recommendations`);
  return response.data.results;
}

export const getMovieCredits = async (id: number) => {
  const response = await api.get(`/movie/${id}/credits`);
  return response.data.cast;
}

export const getMovieExternalIds = async (id: number): Promise<ExternalId> => {
  const response = await api.get(`/movie/${id}/external_ids`);  
  return response.data;
}

export const getMovieKeywords = async (id: number): Promise<Keyword> => {
  const response = await api.get(`/movie/${id}/keywords`);  
  return response.data.keywords;
}

export const getAllMoviesKeywords = async (id: number) => {
  const response = await api.get(`/keyword/${id}/movies`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item) => {
          return {
            id: item.id,
            poster_path: `https://media.themoviedb.org/t/p/w94_and_h141_bestv2/${item.poster_path}`,
            title: item.title,
            original_title: item.original_title,
            release_date: item.release_date,
            overview: item.overview
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

export const getPersonDetails = async (id: number): Promise<MovieDetail> => {
  const response = await api.get(`/person/${id}`);  
  return response.data;
}

export const getPersonCredits = async (id: number): Promise<MovieDetail> => {
  const response = await api.get(`/person/${id}/movie_credits`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.cast.map((item) => {
          return {
            id: item.id,
            poster_path: `https://media.themoviedb.org/t/p/w150_and_h225_bestv2${item.poster_path}`,
            title: item.title
          }
        })
      }
    }]
  });  
  return response.data.results;
}

export const getPersonExternalIDs = async (id: number): Promise<MovieDetail> => {
  const response = await api.get(`/person/${id}/external_ids`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        id: parsedData.id,
        facebook_id: parsedData.facebook_id,
        twitter_id: parsedData.twitter_id,
        instagram_id: parsedData.instagram_id
      }
    }]
  });
  return response.data;
}