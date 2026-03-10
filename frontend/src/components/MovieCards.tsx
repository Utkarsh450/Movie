import { useSelector } from "react-redux";
import {type RootState } from "../redux/store";

interface Props {
  title: string;
  category: string;
  type: "movie" | "tv";
}

const MovieCards: React.FC<Props> = ({ title, category, type }) => {

  const items = useSelector((state: RootState) =>
    type === "movie"
      ? state.movies[category]
      : state.tv[category]
  );

  return (
    <div className="w-full flex bg-zinc-900 flex-col gap-2">

      <div className="font-semibold text-2xl text-zinc-50 font-[satoshi] px-20 mt-10">
        {title}
      </div>

      <div className="w-full overflow-hidden">

        <div className="flex px-8 py-4 overflow-x-auto scrollbar-hide scroll-smooth gap-3">

          {items?.map((item: any) => (

            <div
              key={item.id}
              className="w-52 h-64 shrink-0 rounded-xl bg-zinc-800 hover:scale-105 transition cursor-pointer"
            >

              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                className="w-full h-full object-cover rounded-xl"
              />

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default MovieCards;