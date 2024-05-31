import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CardItem from "./Card";
import Banner from "./Banner";
import { Key, useState } from "react";
import { useMoviesPopilares, useMoviesUpcoming } from "@/utils/queries";
import { formateDate } from "@/lib/utils";

function HomePage() {
  const [activeTab, setActiveTab] = useState('populares');
  const moviesPopulares = useMoviesPopilares();
  const MoviesUpcoming = useMoviesUpcoming();

  return (
    <>
      <Banner />
      
      <div className="min-h-screen">
        <div className="container">        
          <Tabs defaultValue="populares" value={activeTab} onValueChange={setActiveTab} className="mt-3">
            <div className="flex items-center">
              <h2 className="mr-3 font-semi-bold font-serif hidden sm:block text-md sm:text-2xl md:text-2xl">Os Mais Populares</h2>
              <div className="w-[600px]">              
                <TabsList className="grid w-full mb-[95px] sm:mb-[31px] md:mb-[0px] sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 bg-transparent border border-[#1BB293]">
                  <TabsTrigger value="populares" className={activeTab === 'populares' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Populares</TabsTrigger>
                  <TabsTrigger value="lancamentos" className={activeTab === 'lancamentos' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Lançamentos</TabsTrigger>
                  <TabsTrigger value="series" className={activeTab === 'series' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Séries</TabsTrigger>
                  <TabsTrigger value="pessoas" className={activeTab === 'pessoas' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Pessoas</TabsTrigger>
              </TabsList>
              </div>
            </div>

            <TabsContent value="populares" className="mt-3">
              <div className="flex justify-center sm:justify-start">
                <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

                  {moviesPopulares.isLoading && 'Carregando...'}

                  {moviesPopulares.data &&
                    <>
                      {moviesPopulares.data.results.map((item: { id: Key | null | undefined; poster_path: string | undefined; title: string; release_date: string; }) => (
                        <CardItem
                          key={item.id}
                          poster_path={item.poster_path}
                          title={item.title}
                          release_date={formateDate(item.release_date)}
                        />  
                      ))}
                    </>
                  
                  }

                </div>
              </div>
              
            </TabsContent>

            <TabsContent value="lancamentos">
              <div className="flex justify-center sm:justify-start">
                <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

                  {MoviesUpcoming.isLoading && 'Carregando...'}

                  {MoviesUpcoming.data &&
                    <>
                      {MoviesUpcoming.data.results.map((item: { id: Key | null | undefined; poster_path: string | undefined; title: string; release_date: string; }) => (
                        <CardItem
                          key={item.id}
                          poster_path={item.poster_path}
                          title={item.title}
                          release_date={formateDate(item.release_date)}
                        />
                      ))}
                    </>

                  }

                </div>
              </div>
            </TabsContent>

            <TabsContent value="series">
              Séries
            </TabsContent>

            <TabsContent value="pessoas">
              Pessoas
            </TabsContent>
          </Tabs>        
        </div>

      </div>

    </>
  )
}

export default HomePage
