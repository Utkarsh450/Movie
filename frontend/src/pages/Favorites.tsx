import { useSelector, useDispatch } from "react-redux"
import {type RootState } from "../redux/store"
import { toggleFavorite } from "../redux/slices/favorites"
import { Link } from "react-router-dom"

const Favorites = () => {

  const dispatch = useDispatch()

  const favorites = useSelector(
    (state: RootState) => state.favorites.items
  )

  if (!favorites.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-3xl font-semibold">
        No Favorites Yet ❤️
      </div>
    )
  }

  return (

    <div className="w-full min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        Your Favorites
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {favorites.map((item:any)=>(

          <div
            key={item.id}
            className="relative hover:scale-105 transition"
          >

            {/* Poster */}

            <Link to={`/${item.media_type}/${item.id}`}>

              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "/placeholder.png"
                }
                className="rounded-xl"
              />

            </Link>

            {/* Remove Favorite */}

            <button
              onClick={()=>dispatch(toggleFavorite(item))}
              className="absolute top-2 right-2 text-xl"
            >
              ❤️
            </button>

            {/* Title */}

            <p className="mt-2 text-sm text-center">
              {item.title || item.name}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Favorites