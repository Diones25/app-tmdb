import { Play } from "lucide-react";
import CardImage from "./CardImage";
import VoteAveregeItem from "./VoteAveregeItem";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieVideos } from "@/utils/api";
import { MovieDetail } from "@/types/MovieDetail";
import { formateDateDetails, formateDuration, formateYear } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MoviesDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail>({});
  const [video, setVideo] = useState([]);
  
  useEffect(() => {
    (async () => {
      const res = await getMovieDetails(Number(id));
      setMovie(res);
    })();

    (async () => {
      const res = await getMovieVideos(Number(id));
      setVideo(res[0]);            
    })();
  }, []);

  return (
    <>
      <div className="min-h-screen mt-3 text-white">
        <div
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1920_and_h800_face/`}.${movie.backdrop_path})`,
          }}        
          className="bg-no-repeat bg-cover bg-center"
        >
          <div className='bg-[rgba(0,0,0,0.6)] py-6'>
            <div className="container">                          
              <div className="flex flex-col lg:flex-row items-center py-7">
                <CardImage
                  poster_path={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}                  
                /> 

                <div className="ml-9 mt-3 text-center lg:text-left">
                  <h2 className="text-white text-4xl font-bold">{movie.title}<span className="font-normal">({formateYear(movie.release_date)})</span></h2>
                  <p>                    
                    <span className="mr-1">{formateDateDetails(movie.release_date) }</span>
                    <span className="font-bold">.</span>
                    <span className="mx-1">
                      {movie.genres+","}                      
                    </span>
                    <span className="font-bold">.</span>
                    <span className="ml-1">{ formateDuration(movie.runtime) }</span>
                  </p>

                  <div className="flex justify-center lg:justify-start mt-5">
                    <div>
                      <div className="flex items-center">
                        <VoteAveregeItem
                          vote_average={movie.vote_average}
                        />
                        <div className="ml-2 text-left font-bold">
                          <p>Avaliação</p>
                          <p>dos</p>
                          <p>usuários</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {video !== undefined &&
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex justify-center m-auto lg:ml-0 my-3 py-1 px-1 w-44 cursor-pointer rounded-sm hover:bg-gray-500 ">
                          <Play />
                          <span className="font-semibold">Reproduzir trailer</span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[920px]">
                        <DialogHeader>
                          <DialogTitle>Trailer Oficial</DialogTitle>
                        </DialogHeader>

                        <div>
                          <iframe
                            className="w-full h-[28rem]"
                            src={`https://www.youtube.com/embed/${video?.key}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          >                          
                          </iframe>
                        </div>

                      </DialogContent>
                    </Dialog>
                  
                  }
                  
                  <div className="mt-4">
                    <p>{ movie.tagline }</p>
                    <h2 className="font-semibold text-2xl my-2">Sinopse</h2>
                    <p>{ movie.overview }</p>
                  </div>
                </div>
              </div>             

            </div>
            

          </div>
        </div>
      </div> 
    </>
  )
}

export default MoviesDetails

