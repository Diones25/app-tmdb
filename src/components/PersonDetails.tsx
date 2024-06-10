import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Link, useParams } from "react-router-dom";
import CardMoviePerson from "./CardMoviePerson";
import svgFacebook from '../assets/facebook.svg';
import svgTwitter from '../assets/twitter.svg';
import svgInstagram from '../assets/instagram.svg';
import { useEffect, useState } from "react";
import { getPersonCredits, getPersonDetails, getPersonExternalIDs } from "@/utils/api";
import { formateDate, returnAge } from "@/lib/utils";
import { TypePersonDetails } from "@/types/PersonDetails";
import { PersonExternalIDs } from "@/types/PersonExternalIDs";
import { PersonCredits } from "@/types/PersonCredits";

const PersonDetails = () => {
  const { id } = useParams();
  const [personDetails, setPersonDetails] = useState<TypePersonDetails>();
  const [personCredits, setPersonCredits] = useState<PersonCredits[]>([]);
  const [personExternalID, setPersonExternalID] = useState<PersonExternalIDs>();

  useEffect(() => {
    (async () => {
      const res = await getPersonDetails(Number(id));
      setPersonDetails(res);
    })();

    (async () => {
      const res = await getPersonCredits(Number(id));
      setPersonCredits(res);
    })();

    (async () => {
      const res = await getPersonExternalIDs(Number(id));
      setPersonExternalID(res);
    })();
  }, []);

  return (
    <>
      <div className="container">
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row mt-8'>

          <div className="m-auto sm:m-auto md:m-auto lg:ml-0">
            <div className="min-w-[18.8rem] h-[450px] mr-7">
              <img className="rounded-sm" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${personDetails?.profile_path}`} alt="" />
            </div>

            <div className="flex justify-center sm:justify-center md:justify-center lg:justify-start mt-8 ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={`https://www.facebook.com/${personExternalID?.facebook_id}`}>
                      <img src={svgFacebook} alt="facebook" className="w-9 mr-2" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 rounded-sm py-1 px-3 text-white">
                    <p>Visitar Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={`https://twitter.com/${personExternalID?.twitter_id}`}>
                      <img src={svgTwitter} alt="twitter" className="w-9 ml-2 mr-2" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 rounded-sm py-1 px-3 text-white">
                    <p>Visitar Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={`https://instagram.com/${personExternalID?.instagram_id}`}>
                      <img src={svgInstagram} alt="instagram" className="w-9 mr-2" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 rounded-sm py-1 px-3 text-white">
                    <p>Visitar Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-4xl text-center sm:text-center md:text-center lg:text-left">{ personDetails?.name }</h1>

            <div className="my-4">
              <p className="font-semibold text-xl">Biografia</p>
              <p className="mt-2">
                {personDetails?.biography}
              </p>
            </div>

            <div className="sm:w-[20rem] md:w-[38rem] lg:min-w-[30rem] xl:w-[55rem]">
              <p className="font-semibold text-xl mb-1">Conhecido(a) por</p>
              <div className="flex overflow-x-scroll overflow-y-hidden gap-4 pb-3">
                {personCredits &&
                  <>
                  {personCredits.map(item => (
                      <Link to={`/details/${item.id}`}>
                        <CardMoviePerson
                          key={item.id}
                          poster_path={item.poster_path}
                          title={item.title}
                        />                                                             
                      </Link>
                    ))}
                  </>
                }
              </div>
            </div>

          </div>
        </div>
        
      </div>

      <div className="container mt-8">
        <p className="font-semibold text-xl text-center sm:text-center md:text-left lg:text-left">Informações pessoais</p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-3 mb-2">         
          <div className="mb-3 text-center sm:text-center md:text-left lg:text-left">
            <p className="font-semibold">Conhecido(a) por</p>
            <p>{personDetails?.known_for_department === 'Acting' ? 'Atuação' : '' }</p>
          </div>

          <div className="mb-3 text-center sm:text-center md:text-left lg:text-left">
            <p className="font-semibold">Gênero</p>
            <p>{ Number(personDetails?.gender) === 2 ? 'Masculino' : 'Feminino' }</p>
            <p>{ Number(personDetails?.gender) === 3 ? 'Não binário' : '' }</p>
          </div>
        
          <div className="mb-3 text-center sm:text-center md:text-left lg:text-left">
            <p className="font-semibold">Nascimento</p>
            <p>{formateDate(personDetails.birthday)} ({returnAge(personDetails?.birthday) } de Idade)</p>
          </div>

          <div className="mb-3 text-center sm:text-center md:text-left lg:text-left">
            <p className="font-semibold">Local de nascimento (em inglês)</p>
            <p>{ personDetails?.place_of_birth }</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonDetails
