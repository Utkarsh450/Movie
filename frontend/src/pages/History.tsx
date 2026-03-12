import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"
import { clearHistory } from "../redux/slices/historySlice"
import { Link } from "react-router-dom"

interface HistoryItem {
  id: number
  poster_path: string
  title?: string
  name?: string
  media_type: "movie" | "tv"
}

const History = () => {

  const dispatch = useDispatch()

  const history = useSelector(
    (state: RootState) => state.history.items
  )

  if (!history.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-3xl font-semibold">
        No Watch History Yet 📺
      </div>
    )
  }

  return (

    <div className="bg-black min-h-screen p-10 text-white">

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          Watch History
        </h1>

        <button
          onClick={() => dispatch(clearHistory())}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg"
        >
          Clear History
        </button>

      </div>

      {/* History Grid */}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {history.map((item: HistoryItem) => (

          <div
            key={item.id}
            className="hover:scale-105 transition"
          >

            <Link to={`/${item.media_type}/${item.id}`}>

              <img
                loading="lazy"
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "/placeholder.png"
                }
                className="rounded-xl"
              />

            </Link>

            <p className="text-sm mt-2 text-center text-gray-300">
              {item.title || item.name}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default History