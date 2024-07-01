type Props = {
  poster_path: string;
  name: string;
  star: string;
  vote_average: number | string;
  air_date: string;
  episode_count: number;
  overview: string;
}

const CardSeasonsDetails = ({ poster_path, name, star, vote_average, air_date, episode_count, overview }: Props) => {
  return (
    <>
      <div className="container">
        <div className="flex items-center py-4">
          <div className="mr-5">
            <img
              src={poster_path}
              className="max-w-[130px] max-h[195px] rounded-sm"
              alt="Poster da temporada"
            />
          </div>

          <div>
            <div>
              <h1 className="text-black font-bold text-xl mr-2">{ name }</h1>
              <div className="flex justify-center lg:justify-start text-black mt-3 lg:mt-0">

                {vote_average ? (
                  <>
                    <div className="flex justify-center items-center bg-[#032541] rounded-sm text-white w-14 py-1 mr-2">
                      <img src={star} className="w-3 mr-1" alt="star" />
                      <span className="text-sm">{vote_average}</span>
                      <span className="text-[11px]">%</span>
                    </div>
                  </>
                ) : (
                  <p className="mr-2">--</p>
                )}
                <span>{air_date}</span>
                <span className="mx-1">.</span>
                <span>{episode_count} episódios</span>
              </div>
            </div>

            <div className="text-black">
              <p className="my-4 px-2 md:pr-2 text-center sm:text-center md:text-center lg:text-left">
                {overview ? (
                  <>
                    {overview}
                  </>
                ) : (
                  <p>Sem descrição</p>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardSeasonsDetails
