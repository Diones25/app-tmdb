import { Link, useParams } from 'react-router-dom';
import { useSerieExternalIds, useSeriesSeasonsEpisodeDetails } from "@/utils/queries";
import imageNotFound from '../assets/imageNotFound.png';
import arrowLeft from '../assets/arrowLeft.svg';
import star from '../assets/star.svg';
import Navbar from "./Navbar";
import { formateDuration, formateYear } from '@/lib/utils';
import CardSeasonsEpisodeDetails from './CardSeasonsEpisodeDetails';

function SeriesSeasonsEpisodeDetails() {
  const { series_id, season_number } = useParams();
  const externalId = useSerieExternalIds(Number(series_id));
  const seriesSeasonsEpisodeDetails = useSeriesSeasonsEpisodeDetails(Number(series_id), Number(season_number));

  return (
    <>
      <Navbar />

      <div className="flex justify-center">
        {seriesSeasonsEpisodeDetails.isLoading && "Carregando..."}
      </div>

      <div className="min-h-screen mt-3 ">
        <div className="bg-gray-300 mt-6">
          <div className="container">
            <div className="flex items-center py-4">
              <div className="mr-5">
                <img
                  src={seriesSeasonsEpisodeDetails.data?.poster_path ? `https://media.themoviedb.org/t/p/w58_and_h87_face${seriesSeasonsEpisodeDetails.data?.poster_path}` : imageNotFound}
                  className="rounded-[3px]"
                  alt="Poster da serie"
                />
              </div>

              <div>
                <div className="flex">
                  <h1 className="text-black font-bold text-3xl mr-2">{seriesSeasonsEpisodeDetails.data?.name}</h1>
                  <h1 className="text-black font-semibold text-3xl">({formateYear(seriesSeasonsEpisodeDetails.data?.air_date as string)})</h1>
                </div>

                <Link to={`/tv/${series_id}/seasons`}>
                  <div className='flex items-center cursor-pointer'>
                    <img
                      src={arrowLeft}
                      className='mr-2 w-3'
                      alt="arrow left"
                    />
                    <span className="text-gray-600 font-semibold hover:text-gray-400">Voltar à lista de temporadas</span>
                  </div>
                </Link>

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h1 className="text-black font-bold text-2xl mt-6 mb-3">Episódios <span className='font-normal text-gray-500'>{seriesSeasonsEpisodeDetails.data?.episodes.length}</span></h1>
        </div>

        {seriesSeasonsEpisodeDetails.data?.episodes !== undefined ? (
          <>
            {seriesSeasonsEpisodeDetails.data?.episodes.map((item) => (
              <div key={item.id}>
                <CardSeasonsEpisodeDetails
                  still_path={item.still_path ? `https://media.themoviedb.org/t/p/w227_and_h127_bestv2${item.still_path}` : imageNotFound}
                  name={item.name}
                  star={star}
                  vote_average={item.vote_average ? (item.vote_average as number * 10).toFixed(0) : 0}
                  air_date={item.air_date ? formateYear(item.air_date as string) : "--"}
                  runtime={formateDuration(item.runtime as unknown as string)}
                  overview={item.overview}
                  imdb={externalId.data?.imdb_id}
                  season_number={item.season_number}
                  episode_number={item.episode_number}
                  series_id={series_id}
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

export default SeriesSeasonsEpisodeDetails
