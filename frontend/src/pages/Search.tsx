import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useDebounce from "../hooks/useDebounce"
import api from "../utils/axiosConfig/axiosConf"
import useInfiniteMovies from "../hooks/useInfinite"
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "../components/Loader"
import type { MediaSummary, SearchResult } from "../types/media"

const Search = () => {

  const { movies, hasMore, fetchMovies } = useInfiniteMovies()

  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  const debouncedValue = useDebounce(query, 500)

  useEffect(() => {

    const searchQuery = async () => {

      if (!debouncedValue) {
        setResults([])
        return
      }

      try {

        setLoading(true)

        const res = await api.get(
          `/search/multi?query=${encodeURIComponent(debouncedValue)}&api_key=${import.meta.env.VITE_API_KEY}`
        )

        const filtered = (res.data.results as SearchResult[]).filter(
          (item) => item.media_type !== "person"
        )

        setResults(filtered)

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }

    }

    searchQuery()

  }, [debouncedValue])


  /* FULL PAGE LOADER (first load popular movies) */

  if (!query && movies.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <Loader />
      </div>
    )
  }


  return (

    <div className="flex flex-col gap-2 font-[satoshi] bg-zinc-900 min-h-screen">

      {/* SEARCH INPUT */}

      <div className="pl-10 mt-18">

        <input
          value={query}
          className="w-[94%] px-6 py-4 rounded-lg bg-zinc-800 outline-none text-zinc-100 text-2xl"
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Search movies, TV shows..."
        />

      </div>


      {/* SEARCH RESULTS */}

      {query && (

        <div className="px-10 mt-10">

          <h2 className="text-4xl text-white font-semibold mb-6">
            Search Results
          </h2>

          {loading ? (

            <div className="flex justify-center py-10">
              <Loader />
            </div>

          ) : (

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

              {results.map((item) =>(
                <Link
                  key={item.id}
                  to={`/${item.media_type}/${item.id}`}
                  className="hover:scale-105 transition"
                >

                  <img
                    loading="lazy"
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "/placeholder.png"
                    }
                    className="rounded-xl"
                  />

                  <p className="text-white mt-2 text-sm">
                    {item.title || item.name}
                  </p>

                </Link>
              ))}

            </div>

          )}

        </div>

      )}


      {/* POPULAR MOVIES */}

      {!query && (

        <div className="flex flex-col">

          <div className="font-semibold text-5xl px-10 mt-18 text-zinc-100">
            Popular Movies
          </div>

          <InfiniteScroll
            dataLength={movies.length}
            next={fetchMovies}
            hasMore={hasMore}
            scrollThreshold={0.9}
            loader={
              <div className="flex justify-center py-10">
                <Loader />
              </div>
            }
          >

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-10">

              {movies.map((movie: MediaSummary)=>(
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="hover:scale-105 transition"
                >

                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="rounded-xl"
                  />

                </Link>
              ))}

            </div>

          </InfiniteScroll>

        </div>

      )}

    </div>
  )
}


export default Search
