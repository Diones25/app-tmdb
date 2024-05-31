import {
  Card,
  CardFooter,
} from "@/components/ui/card"

type Props = {
  id?: number;
  poster_path?: string;
  vote_average?: number;
  title: string;
  release_date: string
}

function CardItem({ id, poster_path, vote_average, title, release_date }: Props) {
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
          <h2 className="self-start font-bold hover:text-[#53B4E4]">{title }</h2>
          <span className="self-start text-[#717272]">{release_date }</span>
        </CardFooter>
      </Card>
    </>
  )
}

export default CardItem
