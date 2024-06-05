
type Props = {
  id?: number;
  backdrop_path: string;
  title: string;
  vote_average: number;
}

const MoviesRecommended = ({ id, backdrop_path, title, vote_average }: Props) => {
  return (
    <>
      <div className="">
        <div className="w-[250px]">
          <img className="rounded-sm" src={backdrop_path} alt="" />
          <div className="flex justify-between mt-2 text-black">
            <p>{title}</p>
            <p>{vote_average}%</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MoviesRecommended
