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

const CardPerson = ({ id, poster_path, vote_average, title, release_date,character }: Props) => {
  return (
    <>
      <Card className="w-[200px] hover:drop-shadow-2xl cursor-pointer">
        <div>
          <img
            className='w-full object-cover rounded-t-md'
            src={poster_path}
            alt=""
          />
        </div>
        <CardFooter className="flex flex-col mt-5">
          <div className="self-start">
          </div>
          <h2 className="self-start font-bold hover:text-[#53B4E4]">{title}</h2>
          <p className="self-start">{ character }</p>
          <span className="self-start text-[#717272]">{release_date}</span>
        </CardFooter>
      </Card>
    </>
  )
}

export default CardPerson
