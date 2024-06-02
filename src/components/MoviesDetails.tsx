import { Play } from "lucide-react"
import CardImage from "./CardImage"

const MoviesDetails = () => {
  return (
    <>
      <div className="min-h-screen mt-3 text-white">
        <div
          className="bg-[url('https://www.themoviedb.org/t/p/w1920_and_h800_face//dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg')] bg-no-repeat bg-cover bg-center"
        >
          <div className='bg-[rgba(0,0,0,0.6)]'>
            <div className="container">                          
              <div className="flex flex-col lg:flex-row items-center py-7">
                <CardImage
                  poster_path="https://image.tmdb.org/t/p/w600_and_h900_bestv2/dzDK2TMXsxrolGVdZwNGcOlZqrF.jpg"
                /> 

                <div className="ml-9 mt-3 text-center lg:text-left">
                  <h2 className="text-white text-4xl font-bold">Planeta dos Macacos: O Reinado <span className="font-normal">(2024)</span></h2>
                  <p>
                    <span className="border px-1 mr-1">14</span>
                    <span className="mr-1">09/05/2024</span>
                    <span className="font-bold">.</span>
                    <span className="mx-1">Ficção científica, Aventura, Ação</span>
                    <span className="font-bold">.</span>
                    <span className="ml-1">2h 25m</span>
                  </p>
                  <div className="flex m-auto lg:ml-0 my-6 w-44 cursor-pointer">
                    <Play />
                    <span className="font-semibold">Reproduzir trailer</span>
                  </div>
                  
                  <div className="">
                    <p>Ninguém pode parar o reinado.</p>
                    <h2 className="font-semibold text-2xl my-2">Sinopse</h2>
                    <p>Várias gerações no futuro, após o reinado de César, os macacos são agora a espécie dominante e
                      vivem harmoniosamente, enquanto os humanos foram reduzidos a viver nas sombras. À medida que um novo
                      líder símio tirânico constrói o seu império, um jovem macaco empreende uma jornada angustiante que o
                      levará a questionar tudo o que sabia sobre o passado e a fazer escolhas que definirão um futuro tanto
                      para os macacos como para os humanos.
                    </p>
                  </div>
                </div>
              </div>             

            </div>
            

          </div>
        </div>
      </div> 
    </>
  )
}

export default MoviesDetails

