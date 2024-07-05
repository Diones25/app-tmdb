import { Link, useParams } from 'react-router-dom';
import { Button } from "./ui/button"
import { useEffect, useState } from 'react';
import { getAllMoviesKeywords } from '@/utils/api';
import CardKeywordMovies from './CardKeywordMovies';
import { TypeAllMoviesKeywords } from '@/types/AllMoviesKeywords';

const AllMoviesKeywords = () => {
  const { id } = useParams();
  const [keywordsMovies, setKeywordsMovies] = useState<TypeAllMoviesKeywords>();

  useEffect(() => {
    (async () => {
      const res = await getAllMoviesKeywords(Number(id));
      setKeywordsMovies(res);
    })();
  },[]);

  return (
    <>
      <div className="min-h-screen mt-3">
        <div className="container">          

          {keywordsMovies &&
            <>
            {keywordsMovies.results.map((item) => (
              <div key={item.id}>
                <Link to={`/details/${item.id}`}>
                  <CardKeywordMovies
                    key={item.id}
                    poster_path={item.poster_path}
                    title={item.title}
                    original_title={item.original_title}
                    release_date={item.release_date}
                    overview={item.overview}
                  />
                </Link>
              </div>
              ))}
            </>
          }

          <Button className="w-full text-xl bg-blue-400 hover:bg-blue-300 hover:text-black">Carregar mais</Button>

        </div>
      </div>
    </>
  )
}

export default AllMoviesKeywords
