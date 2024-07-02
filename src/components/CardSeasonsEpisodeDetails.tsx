import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";

type Props = {
  still_path: string;
  name: string;
  star: string;
  vote_average: number | string;
  air_date: string;
  runtime: string;
  overview: string;
  season_number?: number;
  episode_number?: number;
  imdb?: string;
  series_id?: string;
}

const CardSeasonsEpisodeDetails = ({ still_path, name, star, vote_average, air_date, runtime, overview, season_number, episode_number, imdb, series_id }: Props) => {
  const [activeTab, setActiveTab] = useState('player1');

  return (
    <>
      <div className="container">
        <div className="flex border mb-7 rounded-sm">
          <div className="mr-5">
            <img
              src={still_path}
              className="max-w-[227px] max-h[127px] rounded-tl-sm"
              alt="Poster da temporada"
            />            
          </div>

          <div className="py-3">
            <div>
              <h1 className="text-black font-bold text-xl mr-2">{name}</h1>                           
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
                <span>{runtime}</span>
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

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger><span className="bg-red-500 text-white px-2 rounded-[2px]">Assistir</span></AccordionTrigger>
                  <AccordionContent>
                    <Tabs defaultValue="player1" value={activeTab} onValueChange={setActiveTab} className="mt-3">
                      <div className="flex items-center">                        
                        <div className="w-[600px]">
                          <TabsList className="grid w-full mb-[95px] sm:mb-[31px] md:mb-[0px] sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 bg-transparent border border-[#1BB293]">
                            <TabsTrigger value="player1" className={activeTab === 'player1' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Player 1</TabsTrigger>
                            <TabsTrigger value="player2" className={activeTab === 'player2' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Player 2</TabsTrigger>                            
                          </TabsList>
                        </div>
                      </div>

                      <TabsContent value="player1" className="mt-3">
                        <div>
                          <iframe
                            id="EmbedderContainer"
                            className="w-full h-[28rem]"
                            src={`https://superflixapi.dev/serie/${series_id}/${season_number}/${episode_number}`}
                            frameBorder="0"
                            allowFullScreen
                          >
                          </iframe>
                        </div>
                      </TabsContent>

                      <TabsContent value="player2">
                        <div>
                          <iframe
                            id="EmbedderContainer"
                            className="w-full h-[28rem]"
                            src={`https://embedder.net/e/series?imdb=${imdb}&sea=${season_number}&epi=${episode_number}`}
                            frameBorder="0"
                            allowFullScreen
                          >
                          </iframe>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default CardSeasonsEpisodeDetails
