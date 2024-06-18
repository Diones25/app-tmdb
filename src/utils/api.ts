import { ResultsAllMoviesKeywords, TypeAllMoviesKeywords } from "@/types/AllMoviesKeywords";
import { ExternalId } from "@/types/ExternalId";
import { FilePath } from "@/types/FilePath";
import { Key } from "@/types/Key";
import { Keyword } from "@/types/Keyword";
import { MovieCredits, MovieCreditsArray } from "@/types/MovieCredits";
import { Genre, MovieDetail } from "@/types/MovieDetail";
import { MovieRecommended } from "@/types/MovieRecommended";
import { MoviesPopulares, Results } from "@/types/MoviesPopulares";
import { MoviesUpcoming, ResultsUpcoming } from "@/types/MoviesUpcoming";
import { PersonCredits } from "@/types/PersonCredits";
import { TypePersonDetails } from "@/types/PersonDetails";
import { PersonExternalIDs } from "@/types/PersonExternalIDs";
import { PersonsPopulares, ResultsPerson } from "@/types/PersonsPopulares";
import { SeriesPopulares } from "@/types/SeriesPopulares";
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

export const getMoviesPopulares = async (): Promise<MoviesPopulares> => {
  const response = await api.get('/movie/popular', {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);
      
      return {        
        results: parsedData.results.map((item: Results) => {
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

export const getMovieDetailsVideos = async (id: number): Promise<Key[]> => {
  const response = await api.get(`/movie/${id}/videos`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: Key) => {
          return {            
            key: item.key
          }
        }),
      }
    }]
  }); 
  return response.data.results;
}

export const getMovieDetailsVideoTrailer = async (id: number): Promise<Key> => {
  const response = await api.get(`/movie/${id}/videos`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: Key) => {
          return {
            keyInitial: parsedData.results[0].key
          }
        }),
      }
    }]
  });
  return response.data.results;
}

export const getMovieDetailsImages = async (id: number): Promise<FilePath[]> => {
  const url = `https://api.themoviedb.org/3/movie/${id}/images`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWE0MTMwZmZiZjVhZjZhMGRjMTdlNDU2NzE4OThkMCIsInN1YiI6IjYxMzdhZTg3MDdhODA4MDA2MTQ1ZjdjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gJVXz5HjXwJ_ob0dyjxlCXuvIhoPITmPUSWfqX_q-qg'
    }
  };

  const response = await axios.get(url, options);
  const data = response.data.backdrops.map((item: FilePath) => {
    return {
      file_path: item.file_path
    }
  });

  return data;
}

export const getMovieRecommended = async (id: number): Promise<MovieRecommended> => {
  const response = await api.get(`/movie/${id}/recommendations`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: MovieRecommended) => {
          return {
            id: item.id,
            backdrop_path: item.backdrop_path,
            title: item.title,
            vote_average: item.vote_average
          }
        })
      }
    }]
  });
  return response.data.results;
}

export const getMovieCredits = async (id: number): Promise<MovieCreditsArray> => {
  const response = await api.get(`/movie/${id}/credits`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.cast.map((item: MovieCredits) => {
          return {
            id: item.id,
            profile_path: item.profile_path,
            name: item.name,
            character: item.character
          }
        })
      }
    }]
  });
  return response.data.results;
}

export const getMovieExternalIds = async (id: number): Promise<ExternalId> => {
  const response = await api.get(`/movie/${id}/external_ids`);  
  return response.data;
}

export const getMovieKeywords = async (id: number): Promise<Keyword> => {
  const response = await api.get(`/movie/${id}/keywords`);  
  return response.data.keywords;
}

export const getAllMoviesKeywords = async (id: number): Promise<TypeAllMoviesKeywords> => {
  const response = await api.get(`/keyword/${id}/movies`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: ResultsAllMoviesKeywords) => {
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

export const geMoviesUpcoming = async (): Promise<MoviesUpcoming> => {
  const response = await api.get('/movie/upcoming', {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: ResultsUpcoming) => {
          return {
            id: item.id,
            poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
            vote_average: Number(item.vote_average),
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

export const getSeriesPopulares = async (): Promise<SeriesPopulares> => {
  const response = await api.get('/tv/popular', {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: Results) => {
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

export const getPersonsPopulares = async (): Promise<PersonsPopulares> => {
  const response = await api.get('/person/popular', {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: ResultsPerson) => {
          return {
            id: item.id,
            profile_path: item.profile_path,            
            name: item.name
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

export const getPersonDetails = async (id: number): Promise<TypePersonDetails> => {
  const response = await api.get(`/person/${id}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        id: parsedData.id,
        profile_path: parsedData.profile_path,
        name: parsedData.name,
        biography: parsedData.biography,
        known_for_department: parsedData.known_for_department,
        gender: parsedData.gender,
        birthday: parsedData.birthday,
        place_of_birth: parsedData.place_of_birth,
      }
    }]
  }); 

  return response.data;
}

export const getPersonCredits = async (id: number): Promise<PersonCredits[]> => {
  const response = await api.get(`/person/${id}/movie_credits`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.cast.map((item: PersonCredits) => {
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

export const getPersonExternalIDs = async (id: number): Promise<PersonExternalIDs> => {
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