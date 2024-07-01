import { Play } from "lucide-react";
import CardImage from "./CardImage";
import VoteAveregeItem from "./VoteAveregeItem";
import { Link, useParams } from 'react-router-dom';
import { formateDateDetails, formateYear } from "@/lib/utils";
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
import link_HomePage from '../assets/link_HomePage.svg';
import star from '../assets/star.svg';
import calender from '../assets/calender.svg';
import noVideoAvaible from '../assets/no-video-available.jpg';
import imageNotFound from '../assets/imageNotFound.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import MoviesRecommended from "./MoviesRecommended";
import {
  useSerieCredits,
  useSerieDetailsImages,
  useSerieDetailsVideoTrailer,
  useSerieDetailsVideos,
  useSerieExternalIds,
  useSerieKeywords,
  useSerieRecommended,
  useSeriesDetails
} from "@/utils/queries";
import Navbar from "./Navbar";

const SeriesDetails = () => {
  const { id } = useParams();
  const seriesDetails = useSeriesDetails(Number(id));
  const serieVideo = useSerieDetailsVideos(Number(id));
  const serieVideoTrailer = useSerieDetailsVideoTrailer(Number(id));
  const serieImages = useSerieDetailsImages(Number(id));
  const serieCredits = useSerieCredits(Number(id));
  const externalId = useSerieExternalIds(Number(id));
  const keyword = useSerieKeywords(Number(id));
  const serieRecommended = useSerieRecommended(Number(id));

  return (
    <>
      <Navbar />

      <div className="flex justify-center">
        {seriesDetails.isLoading && "Carregando..."}
      </div>

      <div className="min-h-screen mt-3 text-white">
        <div
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1920_and_h800_face/`}.${seriesDetails.data?.backdrop_path})`,
          }}        
          className="bg-no-repeat bg-cover bg-center"
        >
          <div className='bg-[rgba(0,0,0,0.6)] py-6'>
            <div className="container">                          
              <div className="flex flex-col lg:flex-row items-center py-7">
                <CardImage
                  poster_path={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${seriesDetails.data?.poster_path}`}                  
                /> 

                <div className="ml-9 mt-3 text-center lg:text-left">
                  <h2 className="text-white text-4xl font-bold">{seriesDetails.data?.original_name}<span className="font-normal">({formateYear(seriesDetails.data?.first_air_date as string)})</span></h2>
                  <p>                    
                    <span className="mr-1">{formateDateDetails(seriesDetails.data?.first_air_date as string)}</span>
                    <span className="font-bold">.</span>
                    <span className="mx-1">
                      {seriesDetails.data?.genres+","}                      
                    </span>
                  </p>

                  <div className="flex justify-center lg:justify-start mt-5">
                    <div>
                      <div className="flex items-center">
                        <VoteAveregeItem
                          vote_average={seriesDetails.data?.vote_average}
                        />
                        <div className="ml-2 text-left font-bold">
                          <p>Avaliação</p>
                          <p>dos</p>
                          <p>usuários</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {serieVideo.data !== undefined &&
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

                        {serieVideoTrailer.data !== undefined ? (
                          <>
                            <iframe
                              className="w-full h-[28rem]"
                              src={`https://www.youtube.com/embed/${serieVideoTrailer.data?.key}`}
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
                    <p className="text-gray-300">{ seriesDetails.data?.tagline }</p>
                    <h2 className="font-semibold text-2xl my-2">Sinopse</h2>
                    <p>{ seriesDetails.data?.overview }</p>
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

                {serieCredits.data &&
                  <>
                  {serieCredits.data?.map((item) => (
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

              <div className="mt-10">
                <h1 className="text-black text-2xl font-semibold">Temporada atual</h1>

                <div className="my-4 border rounded-sm">

                  <div className=" lg:flex">
                    <div className="lg:mr-5 mt-5 lg:mt-0">
                      <img
                        src="https://media.themoviedb.org/t/p/w130_and_h195_bestv2/nWwhdt7iOFJsWM8Lz1UtaUC6EUf.jpg"
                        className="h-[220px] w-[200px] sm:w-[200px] md:w-[200px] lg:w-[460px] m-auto sm:m-auto md:m-auto lg:rounded-tl-sm "  
                        alt="Poster da temporada"
                      />
                    </div> 

                    <div className="py-4 text-center sm:text-center md:text-center">
                      <div>
                        <h1 className="text-black hover:text-gray-700 text-xl font-semibold cursor-pointer">Temporada 4</h1>
                        <div className="flex justify-center lg:justify-start text-black mt-3 lg:mt-0">
                          <div className="flex justify-center items-center bg-[#032541] rounded-sm text-white w-14 py-1 mr-2">
                            <img src={star} className="w-3 mr-1" alt="star" />
                            <span className="text-sm">58</span>
                            <span className="text-[11px]">%</span>
                          </div>
                          <span>2024</span>
                          <span>.</span>
                          <span>8 episódios</span>
                        </div>
                      </div>

                      <div className="text-black">
                        <p className="my-4 px-2 md:pr-2 text-center sm:text-center md:text-center lg:text-left">
                          O mundo está à beira da ruína. Victoria Neuman está cada vez mais perto do Salão Oval sentindo a pressão do Capitão Pátria, cujo poder está se consolidando. Bruto está com pouco tempo de vida, afastado do filho da Becca, e a equipe de The Boys cansou de suas mentiras. Com os riscos extremamente altos, eles precisam encontrar um modo de trabalhar juntos para salvar o mundo antes que seja tarde.
                        </p>
                      </div>

                      <div className="flex justify-center lg:justify-start text-black px-2">
                        <img src={calender} className="w-4" alt="calendário" />
                        <p className="mx-2">Negócios sujos</p>
                        <p>(4x6, 4 de julho de 2024)</p>
                      </div>
                    </div> 
                  </div>                 
                </div>

                <h1 className="text-black text-lg font-semibold cursor-pointer">Mostrar todas as temporadas</h1>
              </div>

              <div className="flex pb-6 mt-6">

                <Tabs defaultValue="videos">
                  <div className="flex items-center text-black mt-2">
                    <h1 className="text-black text-2xl font-semibold mr-10">Mídia</h1>
                    <TabsList className="bg-transparent">
                      <TabsTrigger value="videos" className="mr-6">Vídeos <span className="text-gray-500">{serieVideo.data?.length}</span></TabsTrigger>
                      <TabsTrigger value="imagens" className="">Imagens de fundo <span className="text-gray-500">{serieImages.data?.length}</span></TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="">
                    <div className=" w-[320px] sm:w-[380px] md:w-[450px] lg:w-[620px] xl:w-[870px] overflow-x-scroll overflow-y-hidden">
                      <TabsContent value="videos">
                        <div className="flex">
                          

                          {serieVideo.data !== undefined ? (
                            <>
                              {serieVideo.data?.map((item, index) => (
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
                          {serieImages.data?.map((item, index) => (
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

                  {serieRecommended.data &&
                    <>
                      {serieRecommended.data?.map(item => (                          
                        <Link to={`/series/details/${item.id}`} key={item.id}>
                          <MoviesRecommended
                            backdrop_path={item.backdrop_path ? `https://media.themoviedb.org/t/p/w250_and_h141_face/${item.backdrop_path}` : imageNotFound}
                            title={item.name}
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
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {seriesDetails.data?.homepage !== null ? (
                        <>
                          <Link to={seriesDetails.data?.homepage as string}>
                            <img src={link_HomePage} alt="homePage" className="w-9 ml-1" />
                          </Link>
                        </>
                      ) : (
                        <img src={link_HomePage} alt="homePage" className="w-9 ml-1" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar página inicial</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="text-black text-center md:text-left mt-6">

                <div className="mb-4">
                  <p className="font-semibold">Situação</p>
                  <p>{seriesDetails.data?.status === "Returning Series" ? "Renovada" : "" }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Emissora</p>
                  <img src={`https://media.themoviedb.org/t/p/h30/${seriesDetails.data?.networks[0].logo_path}`} alt="Emissora" />
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Tipo</p>
                  <p>{seriesDetails.data?.type === "Scripted" ? "Roteirizada" : ""}</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Idioma original</p>
                  <p>{  seriesDetails.data?.original_language === "en" ? "Inglês" : "" }</p>
                </div>
                
                <div className="mb-4">
                  <p className="font-semibold">Palavras-chave</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-2">
                    {keyword.data?.results.map(item => (
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

export default SeriesDetails;

