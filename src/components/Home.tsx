import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CardItem from "./Card";
import Banner from "./Banner";

function HomePage() {
  return (
    <>
      <Banner />
      
      <div className="container">        
        <Tabs defaultValue="account" className="mt-3">
          <div className="flex items-center">
            <h2 className="mr-3 font-semi-bold font-serif hidden sm:block text-md sm:text-2xl md:text-2xl">Os Mais Populares</h2>
            <div className="w-[600px]">              
              <TabsList className="grid w-full mb-[95px] sm:mb-[31px] md:mb-[0px] sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 bg-transparent border border-[#1BB293]">
              <TabsTrigger value="populares" className="focus:bg-gradient-to-r from-sky-500 to-green-500">Populares</TabsTrigger>
              <TabsTrigger value="lancamentos" className="focus:bg-gradient-to-r from-sky-500 to-green-500">Lançamentos</TabsTrigger>
              <TabsTrigger value="series" className="focus:bg-gradient-to-r from-sky-500 to-green-500">Séries</TabsTrigger>
              <TabsTrigger value="pessoas" className="focus:bg-gradient-to-r from-sky-500 to-green-500">Pessoas</TabsTrigger>
            </TabsList>
            </div>
          </div>

          <TabsContent value="populares" className="mt-3">
            <div className="flex justify-center sm:justify-start">
              <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                <CardItem
                  src="https://media.themoviedb.org/t/p/w220_and_h330_face/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                  description="Planeta dos Macacos: O Reinado"
                  date="09 de mai de 2024"
                />

                <CardItem
                  src="https://media.themoviedb.org/t/p/w220_and_h330_face/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                  description="Planeta dos Macacos: O Reinado"
                  date="09 de mai de 2024"
                />

                <CardItem
                  src="https://media.themoviedb.org/t/p/w220_and_h330_face/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                  description="Planeta dos Macacos: O Reinado"
                  date="09 de mai de 2024"
                />

                <CardItem
                  src="https://media.themoviedb.org/t/p/w220_and_h330_face/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                  description="Planeta dos Macacos: O Reinado"
                  date="09 de mai de 2024"
                />

                <CardItem
                  src="https://media.themoviedb.org/t/p/w220_and_h330_face/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                  description="Planeta dos Macacos: O Reinado"
                  date="09 de mai de 2024"
                />

                <CardItem
                  src="https://media.themoviedb.org/t/p/w220_and_h330_face/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                  description="Planeta dos Macacos: O Reinado"
                  date="09 de mai de 2024"
                />

                <CardItem
                  src="https://media.themoviedb.org/t/p/w220_and_h330_face/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                  description="Planeta dos Macacos: O Reinado"
                  date="09 de mai de 2024"
                />

                <CardItem
                  src="https://media.themoviedb.org/t/p/w220_and_h330_face/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                  description="Planeta dos Macacos: O Reinado"
                  date="09 de mai de 2024"
                />

                <CardItem
                  src="https://media.themoviedb.org/t/p/w220_and_h330_face/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                  description="Planeta dos Macacos: O Reinado"
                  date="09 de mai de 2024"
                />

                <CardItem
                  src="https://media.themoviedb.org/t/p/w220_and_h330_face/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                  description="Planeta dos Macacos: O Reinado"
                  date="09 de mai de 2024"
                />

              </div>
            </div>
            
          </TabsContent>

          <TabsContent value="lancamentos">
            Lançamentos
          </TabsContent>

          <TabsContent value="series">
            Séries
          </TabsContent>

          <TabsContent value="pessoas">
            Pessoas
          </TabsContent>
        </Tabs>        
      </div>
    </>
  )
}

export default HomePage
