import {
  Card,
  CardFooter,
} from "@/components/ui/card"

type Props = {
  key?: number | null | undefined;
  profile_path?: string;
  name?: string;
}

const CardPerson = ({ key, profile_path, name }: Props) => {
  return (
    <>
      <Card key={key} className="w-[200px] hover:drop-shadow-2xl cursor-pointer">
        <div>
          <img
            className='w-full object-cover rounded-t-md'
            src={profile_path}
            alt=""
          />
        </div>
        <CardFooter className="flex flex-col mt-5">
          <div className="self-start">
          </div>
          <h2 className="self-start font-bold hover:text-[#53B4E4]">{name}</h2>
        </CardFooter>
      </Card>
    </>
  )
}

export default CardPerson
