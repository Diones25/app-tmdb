import { Play } from "lucide-react";
import CardImage from "./CardImage";
import VoteAveregeItem from "./VoteAveregeItem";
import { Link, useParams } from 'react-router-dom';
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
import noVideoAvaible from '../assets/no-video-available.jpg';
import imageNotFound from '../assets/imageNotFound.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import MoviesRecommended from "./MoviesRecommended";
import {
  useMovieCredits,
  useMovieDetailsImages,
  useMovieDetailsVideoTrailer,
  useMovieDetailsVideos,
  useMovieExternalIds,
  useMovieKeywords,
  useMovieRecommended,
  useMoviesDetails
} from "@/utils/queries";
import Navbar from "./Navbar";

const MoviesDetails = () => {
  const { id } = useParams();
  const moviesDetails = useMoviesDetails(Number(id));
  const movieVideo = useMovieDetailsVideos(Number(id));
  const movieVideoTrailer = useMovieDetailsVideoTrailer(Number(id));
  const movieImages = useMovieDetailsImages(Number(id));
  const movieCredits = useMovieCredits(Number(id));
  const externalId = useMovieExternalIds(Number(id));
  const keyword = useMovieKeywords(Number(id));
  const movieRecommended = useMovieRecommended(Number(id));

  return (
    <>
      <Navbar />

      <div className="flex justify-center">
        {moviesDetails.isLoading && "Carregando..."}
      </div>

      <div className="min-h-screen mt-3 text-white">
        <div
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1920_and_h800_face/`}.${moviesDetails.data?.backdrop_path})`,
          }}        
          className="bg-no-repeat bg-cover bg-center"
        >
          <div className='bg-[rgba(0,0,0,0.6)] py-6'>
            <div className="container">                          
              <div className="flex flex-col lg:flex-row items-center py-7">
                <CardImage
                  poster_path={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${moviesDetails.data?.poster_path}`}                  
                /> 

                <div className="ml-9 mt-3 text-center lg:text-left">
                  <h2 className="text-white text-4xl font-bold">{moviesDetails.data?.title}<span className="font-normal">({formateYear(moviesDetails.data?.release_date)})</span></h2>
                  <p>                    
                    <span className="mr-1">{formateDateDetails(moviesDetails.data?.release_date)}</span>
                    <span className="font-bold">.</span>
                    <span className="mx-1">
                      {moviesDetails.data?.genres+","}                      
                    </span>
                    <span className="font-bold">.</span>
                    <span className="ml-1">{formateDuration(moviesDetails.data?.runtime) }</span>
                  </p>

                  <div className="flex justify-center lg:justify-start mt-5">
                    <div>
                      <div className="flex items-center">
                        <VoteAveregeItem
                          vote_average={moviesDetails.data?.vote_average}
                        />
                        <div className="ml-2 text-left font-bold">
                          <p>Avaliação</p>
                          <p>dos</p>
                          <p>usuários</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {movieVideo.data !== undefined &&
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

                        {movieVideoTrailer.data?.length > 0 ? (
                          <>
                            <iframe
                              className="w-full h-[28rem]"
                              src={`https://www.youtube.com/embed/${movieVideoTrailer.data?.[0].keyInitial}`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            >
                            </iframe>
                          </>
                        ) : (
                          <p className="bg-orange-300 border border-orange-400 rounded-xl w-70 text-center text-white py-2 m-2">Não há trailer para exibição</p>
                        )}

                      </DialogContent>
                    </Dialog>
                  
                  }
                  
                  <div className="mt-4">
                    <p>{ moviesDetails.data?.tagline }</p>
                    <h2 className="font-semibold text-2xl my-2">Sinopse</h2>
                    <p>{ moviesDetails.data?.overview }</p>
                  </div>
                </div>
              </div>             

            </div>            
          </div>
        </div>
        
        <div className="container">
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6'>
            <div className='sm:col-span-3 md:col-span-2'>
              <h1 className="text-black text-2xl font-semibold">Elenco principal</h1>
              <div className="flex overflow-x-scroll overflow-y-hidden gap-4 pb-6 mt-4">

                {movieCredits.data &&
                  <>
                  {movieCredits.data?.map((item) => (
                    <div key={item.id}>
                      <Link to={`/person/details/${item.id}`}>
                        <CardPersonMovieDetail
                          key={item.id}
                          profile_path={item.profile_path ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}` : imageNotFound}
                          name={item.name}
                          character={item.character}
                        />
                      </Link>
                    </div>
                    ))}
                  </>

                }
              </div>

              <div className="flex pb-6 mt-6">

                <Tabs defaultValue="videos">
                  <div className="flex items-center text-black mt-2">
                    <h1 className="text-black text-2xl font-semibold mr-10">Mídia</h1>
                    <TabsList className="bg-transparent">
                      <TabsTrigger value="videos" className="mr-6">Vídeos <span className="text-gray-500">{movieVideo.data?.length}</span></TabsTrigger>
                      <TabsTrigger value="imagens" className="">Imagens de fundo <span className="text-gray-500">{movieImages.data?.length}</span></TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="">
                    <div className="w-[55rem] overflow-x-scroll overflow-y-hidden">
                      <TabsContent value="videos">
                        <div className="flex">
                          

                          {movieVideo.data?.length > 0 ? (
                            <>
                              {movieVideo.data?.map((item, index) => (
                                <iframe
                                  key={index}
                                  className="min-w-[33rem] h-[19rem]"
                                  src={`https://www.youtube.com/embed/${item?.key}`}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  allowFullScreen
                                >
                                </iframe>
                              ))} 
                            </>
                          ) : (
                              <img src={ noVideoAvaible } alt="" />
                          )}
                          
                        </div>
                      </TabsContent>

                      <TabsContent value="imagens">
                        <div className="flex">
                          {movieImages.data?.map((item, index) => (
                            <div key={index} className="min-w-[533px] h-[19rem]">
                              <img src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2${item.file_path}`} alt="" />
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </div>
                  </div>

                </Tabs> 
              </div> 
              
              <div className="mt-6">
                <h1 className="text-black text-2xl font-semibold">Recomendações</h1>
                <div className="flex overflow-x-scroll overflow-y-hidden gap-4 pb-6 mt-4">

                  {movieRecommended.data &&
                    <>
                      {movieRecommended.data?.map(item => (                          
                        <Link to={`/details/${item.id}`} key={item.id}>
                          <MoviesRecommended
                            backdrop_path={`https://media.themoviedb.org/t/p/w250_and_h141_face/${item.backdrop_path}`}
                            title={item.title}
                            vote_average={(item.vote_average * 10).toFixed(0)}
                          /> 
                        </Link>                       
                      ))}
                    </>
                  }
                  
                </div>
              </div>
            </div>

            <div className='sm:col-span-3 md:col-auto mt-4'>

              <div className="flex justify-center md:justify-start mt-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {externalId.data?.facebook_id !== null ? (
                        <>
                          <Link to={`https://www.facebook.com/${externalId.data?.facebook_id}`}>
                            <img src={svgFacebook} alt="facebook" className="w-9 mr-1" />
                          </Link>
                        </>
                      ) : (
                        <img src={svgFacebook} alt="facebook" className="w-9 mr-1" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {externalId.data?.twitter_id !== null ? (
                        <>
                          <Link to={`https://twitter.com/${externalId.data?.twitter_id}`}>
                            <img src={svgTwitter} alt="twitter" className="w-9 ml-1" />
                          </Link>
                        </>
                      ) : (
                        <img src={svgTwitter} alt="twitter" className="w-9 ml-1" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {externalId.data?.instagram_id !== null ? (
                        <>
                          <Link to={`https://instagram.com/${externalId.data?.instagram_id}`}>
                            <img src={svgInstagram} alt="instagram" className="w-9 mr-1" />
                          </Link>
                        </>
                      ) : (
                        <img src={svgInstagram} alt="instagram" className="w-9 mr-1" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>                

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {externalId.data?.imdb_id !== null ? (
                        <>
                          <Link to={`https://www.imdb.com/title/${externalId.data?.imdb_id}`}>
                            <img src={svgIMDB} alt="imdb" className="w-9 ml-1" />
                          </Link>
                        </>
                      ) : (
                        <img src={svgIMDB} alt="imdb" className="w-9 ml-1" />
                      )} 
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar IMDB</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>                
              </div>

              <div className="text-black text-center md:text-left mt-6">

                <div className="mb-4">
                  <p className="font-semibold">Titulo original</p>
                  <p>{ moviesDetails.data?.original_title }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Situação</p>
                  <p>{ moviesDetails.data?.status === "Released" ? "Lançado" : "" }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Idioma original</p>
                  <p>{  moviesDetails.data?.original_language === "en" ? "Inglês" : "" }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Orçamento</p>
                  <p>{ moviesDetails.data?.budget }</p>
                </div>

                <div className="mb-6">
                  <p className="font-semibold">Receita</p>
                  <p>{ moviesDetails.data?.revenue }</p>
                </div>
                
                <div className="mb-4">
                  <p className="font-semibold">Palavras-chave</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-2">
                    {keyword.data?.keywords.map(item => (
                      <div key={item.id}>
                        <Link to={`/keyword/${item.id}/movie`}>
                          <div key={item.id}>
                            <p className="bg-gray-200 text-center rounded-sm py-1">{item.name}</p>
                          </div>
                        </Link>
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

