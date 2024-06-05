import { Play } from "lucide-react";
import CardImage from "./CardImage";
import VoteAveregeItem from "./VoteAveregeItem";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieDetailsImages,
  getMovieDetailsVideos,
  getMovieExternalIds,
  getMovieKeywords,
  getMovieRecommended
} from "@/utils/api";
import { MovieDetail } from "@/types/MovieDetail";
import { formateDateDetails, formateDuration, formateYear } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import CardPersonMovieDetail from "./CardPersonMovieDetail";
import svgFacebook from '../assets/facebook.svg';
import svgTwitter from '../assets/twitter.svg';
import svgInstagram from '../assets/instagram.svg';
import svgIMDB from '../assets/imdb.svg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import MoviesRecommended from "./MoviesRecommended";

const MoviesDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail>({});
  const [movieVideo, setMovieVideo] = useState([]);
  const [movieImages, setMovieImages] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  const [externalId, setExternalId] = useState({});
  const [keyword, setKeyword] = useState([]);
  const [movieRecommended, setMovieRecommended] = useState([]);
  
  useEffect(() => {
    (async () => {
      const res = await getMovieDetails(Number(id));
      setMovie(res);
    })();

    (async () => {
      const res = await getMovieDetailsVideos(Number(id));
      setMovieVideo(res[0]);            
    })();

    (async () => {
      const res = await getMovieCredits(Number(id));
      setMovieCredits(res);      
    })();

    (async () => {
      const res = await getMovieExternalIds(Number(id));
      setExternalId(res);      
    })();

    (async () => {
      const res = await getMovieKeywords(Number(id));
      setKeyword(res);
    })();

    (async () => {
      const res = await getMovieDetailsImages(Number(id));
      
      setMovieImages(res);
    })();

    (async () => {
      const res = await getMovieRecommended(Number(id));
      setMovieRecommended(res);
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

                  {movieVideo !== undefined &&
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
                            src={`https://www.youtube.com/embed/${movieVideo?.key}`}
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
        
        <div className="container">
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6'>
            <div className='sm:col-span-3 md:col-span-2 bg-green-300'>
              <h1 className="text-black text-2xl font-semibold">Elenco principal</h1>
              <div className="flex overflow-x-scroll overflow-y-hidden gap-4 pb-6 mt-4">
                {movieCredits &&
                  <>
                  {movieCredits.map((item) => (
                      <CardPersonMovieDetail
                        key={item.id}
                        poster_path={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`}
                        title={item.name}
                        character={item.character}
                      />
                    ))}
                  </>

                }
              </div>

              <div className="flex overflow-x-scroll overflow-y-hidden gap-4 pb-6 mt-6">
                <Tabs defaultValue="videos">
                  <div className="flex items-center text-black mt-2">
                    <h1 className="text-black text-2xl font-semibold mr-10">Mídia</h1>
                    <TabsList className="bg-transparent">
                      <TabsTrigger value="videos" className="mr-6">Vídeos</TabsTrigger>
                      <TabsTrigger value="imagens" className="">Imagens de fundo</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="videos">
                    <div className="flex">
                      <iframe
                        className="w-[33rem] h-[19rem]"
                        src={`https://www.youtube.com/embed/${movieVideo?.key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      >
                      </iframe>
                      <iframe
                        className="w-[33rem] h-[19rem]"
                        src={`https://www.youtube.com/embed/${movieVideo?.key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      >
                      </iframe>
                    </div>
                  </TabsContent>

                  <TabsContent value="imagens">
                    {/* <div>
                      {movieImages.map(item => (
                        <div>
                          <img src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2${item.file_path}`} alt="" />
                          {`https://media.themoviedb.org/t/p/w533_and_h300_bestv2${item.file_path}`}
                        </div>
                      ))}                      
                    </div> */}
                  </TabsContent>

                </Tabs> 
              </div> 
              
              <div className="mt-6">
                <h1 className="text-black text-2xl font-semibold">Recomendações</h1>
                <div className="flex overflow-x-scroll overflow-y-hidden gap-4 pb-6 mt-4">

                  {movieRecommended &&
                    <>
                      {movieRecommended.map(item => (                          
                        <MoviesRecommended 
                          backdrop_path={`https://media.themoviedb.org/t/p/w250_and_h141_face/${item.backdrop_path}`}
                          title={item.title}
                          vote_average={item.vote_average}
                        />                        
                      ))}
                    </>
                  }
                  
                </div>
              </div>
            </div>

            <div className='sm:col-span-3 md:col-auto bg-orange-300'>

              <div className="flex mt-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to={`https://www.facebook.com/${externalId.facebook_id}`}>
                        <img src={svgFacebook} alt="facebook" className="w-9 mr-1" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to={`https://twitter.com/${externalId.twitter_id}`}>
                        <img src={svgTwitter} alt="twitter" className="w-9 ml-1" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to={`https://instagram.com/${externalId.instagram_id}`}>
                        <img src={svgInstagram} alt="instagram" className="w-9 mr-1" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>                

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to={`https://www.imdb.com/title/${externalId.imdb_id}`}>
                        <img src={svgIMDB} alt="imdb" className="w-9 ml-1" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar IMDB</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>                
              </div>

              <div className="text-black mt-6">

                <div className="mb-4">
                  <p className="font-semibold">Titulo original</p>
                  <p>{ movie.original_title }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Situação</p>
                  <p>{movie.status === "Released" ? "Lançado" : "" }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Idioma original</p>
                  <p>{ movie.original_language === "en" ? "Inglês" : "" }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Orçamento</p>
                  <p>{ movie.budget }</p>
                </div>

                <div className="mb-6">
                  <p className="font-semibold">Receita</p>
                  <p>{ movie.revenue }</p>
                </div>
                
                <div className="mb-4">
                  <p className="font-semibold">Palavras-chave</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mt-2">
                    {keyword.map(item => (
                      <div key={item.id}>
                        <p className="bg-gray-200 text-center rounded-sm py-1">{ item.name }</p>
                      </div>
                    ))}
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

