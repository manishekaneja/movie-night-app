import Link from "next/link";
import { FC, useContext } from "react";
import { BookmarkContext } from "../pages/_app";
import { Tag } from "./Tag";

export const ItemCard: FC<{ data: Item; genreMap: Record<number, string> }> = ({
  data,
  genreMap,
}) => {
  const { value, setter } = useContext(BookmarkContext);

  return (
    <div className="bg-gray-800 p-0 space-y-0 divide-y divide-white transform relative lg:hover:scale-110 hover-high duration-150">
      <div />
      <div>
        <div
          className="w-full max-h-72 h-72 bg-cover bg-center shadow-md bg-no-repeat relative overflow-hidden"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w300${data.poster_path})`,
          }}
        >
          <div className="bg-white h-full max-h-full  transform translate-y-64 overflow-y-auto text-black font-medium px-2 pt-0 bg-opacity-70 flex flex-col justify-start items-center hover:translate-y-0 hover:mt-0 duration-150">
            <img src="/assets/icons/up.svg" className="h-8" alt="up-icon" />
            <p className="flex-1">{data.overview}</p>
            <button
              className="my-1 bg-blue-200 w-full text-black flex items-center justify-center shadow-2xl p-1 mb-2"
              onClick={() => {
                if (
                  data.id.toString() in value &&
                  value[data.id.toString()].bookmarked
                ) {
                  setter(data.id.toString(), {
                    bookmarked: false,
                    note: "",
                    item: data,
                  });
                } else {
                  setter(data.id.toString(), {
                    bookmarked: true,
                    note: "",
                    item: data,
                  });
                }
              }}
            >
              {data.id.toString() in value &&
              value[data.id.toString()].bookmarked ? (
                <>
                  <img
                    src="/assets/icons/unbookmark.svg"
                    className="h-8 tsxt-white"
                    alt="up-icon"
                  />
                  <span className="flex-1">Remove Bookmark</span>
                </>
              ) : (
                <>
                  <img
                    src="/assets/icons/bookmark.svg"
                    className="h-8 tsxt-white"
                    alt="up-icon"
                  />

                  <span className="flex-1">Bookmark</span>
                </>
              )}
            </button>
            <span className="h-4 flex-none inline-block w-full"></span>
          </div>
        </div>
        <div className="flex h-2">
          {data.release_date && (
            <span className="font-black inline-flex px-2 h-8 text-sm items-center justify-center overflow-hidden bg-blue-900 rounded-full text-white transform shadow-lg -translate-y-4 mr-1">
              {data.release_date}
            </span>
          )}
          <div className="flex-1" />
          <span className="font-black inline-flex w-8 h-8 text-sm items-center justify-center overflow-hidden bg-green-900 rounded-full text-white transform shadow-lg -translate-y-4 mr-1">
            {data.vote_average.toFixed(1)}
          </span>
          <span className="font-black inline-flex w-8 h-8 text-lg items-center justify-center overflow-hidden bg-red-900 rounded-full text-white transform shadow-lg -translate-y-4">
            {data.adult ? "A" : "U"}
          </span>
        </div>
        <div className="flex">
          <Link href={`/item/${data.id}`}>
            <p className="text-center flex-1 cursor-pointer tracking-wider py-2 md:py-3 md:text-2xl hover:underline text-xl h-full whitespace-nowrap overflow-hidden overflow-ellipsis px-2 ">
              {data.title || data.name}
            </p>
          </Link>
        </div>
        <div className="flex flex-wrap">
          {data.genre_ids && data.genre_ids
            .map((id) => genreMap[id])
            .filter((tag) => tag && tag.length > 1)
            .map((tag) => (
              <Tag key={tag} data={tag} />
            ))}
        </div>
        <div className="px-4 py-2"></div>
      </div>
    </div>
  );
};
