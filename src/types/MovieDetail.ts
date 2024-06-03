export type MovieDetail = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: string;
  vote_average: number;
  tagline: string;
  overview: string;
  genres: string[]
}

export type Genre = {
  name: string;
}