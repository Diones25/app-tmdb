import {
  Card,
  CardFooter,
} from "@/components/ui/card"

type Props = {
  src: string;
  description: string;
  date: string
}

function CardItem({ src, description, date }: Props) {
  return (
    <>
      <Card className="w-[200px] hover:drop-shadow-2xl cursor-pointer">
        <div>
          <img
            className='w-full object-cover rounded-t-md'
            src={src}
            alt=""
          />
        </div>
        <CardFooter className="flex flex-col mt-5">
          <h2 className="self-start font-bold hover:text-[#53B4E4]">{ description }</h2>
          <span className="self-start text-[#717272]">{ date }</span>
        </CardFooter>
      </Card>
    </>
  )
}

export default CardItem
