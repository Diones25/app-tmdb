import { Link, useParams } from 'react-router-dom';
import {
  useSeriesSeasonsDetails
} from "@/utils/queries";
import Navbar from "./Navbar";
import imageNotFound from '../assets/imageNotFound.png';
import star from '../assets/star.svg';
import arrowLeft from '../assets/arrowLeft.svg';
import { formateYear } from '@/lib/utils';
import CardSeasonsDetails from './CardSeasonsDetails';

const SeriesSeasonsDetails = () => {
  const { id } = useParams();
  const seriesSeasonsDetails = useSeriesSeasonsDetails(Number(id));

  return (
    <>
      <Navbar />

      <div className="flex justify-center">
        {seriesSeasonsDetails.isLoading && "Carregando..."}
      </div>

      <div className="min-h-screen mt-3 ">
        <div className="bg-gray-300 mt-6">
          <div className="container">
            <div className="flex items-center py-4">
              <div className="mr-5">
                <img
                  src={seriesSeasonsDetails.data?.poster_path ? `https://media.themoviedb.org/t/p/w58_and_h87_face${seriesSeasonsDetails.data?.poster_path}` : imageNotFound}
                  className="rounded-[3px]"  
                  alt="Poster da serie"
                />
              </div>

              <div>
                <div className="flex">
                  <h1 className="text-black font-bold text-3xl mr-2">{ seriesSeasonsDetails.data?.name }</h1>
                  <h1 className="text-black font-semibold text-3xl">({formateYear(seriesSeasonsDetails.data?.first_air_date as string)})</h1>
                </div>

                <Link to={`/series/details/${id}`}>
                  <div className='flex items-center cursor-pointer'>
                    <img
                      src={arrowLeft}
                      className='mr-2 w-3'
                      alt="arrow left"
                    />
                    <span className="text-gray-600 font-semibold hover:text-gray-400">Voltar ao início</span>
                  </div>                
                </Link>

              </div>
            </div>
          </div>
        </div>


        {seriesSeasonsDetails.data?.seasons !== undefined ? (
          <>
            {seriesSeasonsDetails.data?.seasons.map((item) => (
              <div key={item.id}>
                <CardSeasonsDetails
                  poster_path={item.poster_path ? `https://media.themoviedb.org/t/p/w130_and_h195_bestv2${item.poster_path}` : imageNotFound}
                  urlImage={`/tv/${id}/season/${item.season_number}`}
                  urlName={`/tv/${id}/season/${item.season_number}`}
                  name={item.name}
                  star={star}
                  vote_average={item.vote_average ? (item.vote_average as number * 10).toFixed(0) : 0}
                  air_date={item.air_date ? formateYear(item.air_date as string) : "--"}
                  episode_count={item.episode_count}
                  overview={item.overview}
                />
              </div>
            ))}
          </>
        ) : (
          <p></p>
        )}
      </div> 

    </>
  )
}

export default SeriesSeasonsDetails;

