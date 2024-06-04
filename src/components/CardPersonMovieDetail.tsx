import {
  Card,
  CardFooter,
} from "@/components/ui/card"

type Props = {
  id?: number;
  poster_path?: string;
  vote_average?: number;
  title?: string;
  character?: string;
  release_date?: string
}

const CardPersonMovieDetail = ({ id, poster_path, title, character }: Props) => {
  return (
    <>
      <Card className="min-w-[140px] h-[265px] rounded-sm hover:drop-shadow-2xl cursor-pointer">
        <div>
          <img
            className='w-[140px] h-[175px] object-cover rounded-t-md'
            src={poster_path}
            alt=""
          />
        </div>
        <CardFooter className="flex flex-col mt-5">
          <div className="self-start ml-[-13px] mt-[-10px]">
            <h2 className=" font-bold text-sm hover:text-[#53B4E4]">{title}</h2>
            <p className="text-sm">{ character }</p>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default CardPersonMovieDetail
