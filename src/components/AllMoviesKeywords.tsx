import { Link, useParams } from 'react-router-dom';
import { Button } from "./ui/button"
import { useEffect, useRef, useState } from 'react';
import { getAllMoviesKeywords } from '@/utils/api';
import CardKeywordMovies from './CardKeywordMovies';
import { TypeAllMoviesKeywords } from '@/types/AllMoviesKeywords';

const AllMoviesKeywords = () => {
  const { id } = useParams();
  const [keywordsMovies, setKeywordsMovies] = useState<TypeAllMoviesKeywords>();
  const [items, setItems] = useState<TypeAllMoviesKeywords["results"]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [autoLoadEnabled, setAutoLoadEnabled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setIsLoading(true);
      setAutoLoadEnabled(false);
      setPage(1);
      const res = await getAllMoviesKeywords(Number(id), 1);
      setKeywordsMovies(res);
      setItems(res.results);
      setTotalPages(res.total_pages);
      setIsLoading(false);
    })();
  }, [id]);

  const loadMore = async (enableAutoLoad: boolean = false) => {
    if (!id) return;
    if (isLoading || isLoadingMore) return;
    if (page >= totalPages) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    const res = await getAllMoviesKeywords(Number(id), nextPage);
    setItems((prev) => [...prev, ...res.results]);
    setKeywordsMovies(res);
    setPage(nextPage);
    if (enableAutoLoad) setAutoLoadEnabled(true);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (!autoLoadEnabled) return;
    if (page >= totalPages) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        loadMore();
      }
    }, { rootMargin: '200px' });

    observer.observe(el);
    return () => observer.disconnect();
  }, [autoLoadEnabled, page, totalPages, id]);

  return (
    <>
      <div className="min-h-screen mt-3">
        <div className="container">          

          {keywordsMovies && !isLoading &&
            <>
            {items.map((item) => (
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

          {isLoading ? (
            "Carregando..."
          ) : (
            <>
              {page < totalPages ? (
                <Button
                  className="w-full text-xl bg-blue-400 hover:bg-blue-300 hover:text-black"
                  onClick={() => loadMore(true)}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Carregando..." : "Carregar mais"}
                </Button>
              ) : (
                ""
              )}
              <div ref={sentinelRef} />
            </>
          )}

        </div>
      </div>
    </>
  )
}

export default AllMoviesKeywords
