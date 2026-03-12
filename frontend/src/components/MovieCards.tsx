import { useSelector, useDispatch } from "react-redux"
import {type RootState } from "../redux/store"
import { Link } from "react-router-dom"
import { toggleFavorite } from "../redux/slices/favorites"

type MovieCategory =
  | "trending"
  | "popular"
  | "topRated"
  | "upcoming"
  | "action"
  | "comedy";

type TvCategory = "trending" | "popular" | "topRated";

interface Props {
  title: string
  category: MovieCategory
  type: "movie" | "tv"
}

const MovieCards: React.FC<Props> = ({ title, category, type }) => {

  const dispatch = useDispatch()
  const movieItems = useSelector((state: RootState) => state.movies)
  const tvItems = useSelector((state: RootState) => state.tv)
  const items =
    type === "movie"
      ? movieItems[category]
      : tvItems[category as TvCategory]

  const favorites = useSelector(
    (state: RootState) => state.favorites.items
  )

  const isFavorite = (id:number) =>
    favorites.some(fav => fav.id === id)

  return (

    <div className="w-full flex bg-zinc-900 flex-col gap-2">

      <div className="font-semibold text-4xl text-zinc-50 font-[satoshi] px-8 mt-10">
        {title}
      </div>

      <div className="w-full overflow-hidden">

        <div className="flex px-8 py-4 overflow-x-auto scrollbar-hide scroll-smooth gap-3">

          {items?.map((item:any)=>(

            <div
              key={item.id}
              className="relative w-52 h-64 shrink-0 hover:scale-105 transition"
            >

              {/* Poster */}

              <Link to={`/${type}/${item.id}`}>

                <img loading="lazy"
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={item.title || item.name}
                  className="w-full h-full object-cover rounded-xl"
                />

              </Link>

              {/* Favorite Button */}

              <button
                onClick={()=> {
                  dispatch(toggleFavorite({
                  id: item.id,
                  poster_path: item.poster_path,
                  title: item.title,
                  name: item.name,
                  media_type: type
                }))}}

                className={`absolute top-2 right-2 text-xl`}
              >

                {isFavorite(item.id) ? "❤️" : "🤍"}

              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default MovieCards
