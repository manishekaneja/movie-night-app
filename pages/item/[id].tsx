import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { API_KEY } from "../../api-key";
import Layout from "../../components/layout";
import { useDateFetcher } from "../../hooks/useDataFetcher";
import { BookmarkContext } from "../_app";

export default function GenrePage() {
  const router = useRouter(); 
  const { id } = router.query;
  const { getMovieDetails } = useDateFetcher(API_KEY);
  const { value, setter } = useContext(BookmarkContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Item | null>(null);
  useEffect(() => {
    setLoading(true);
    getMovieDetails(id)
      .then((data) => {
        setData(data);
      })
      .catch(() => console.log("object"))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  return (
    <Layout
      title={
        loading
          ? "Loading..."
          : data
          ? data.original_title || data.name
          : "404 | Movie Night"
      }
    >
      {loading ? (
        <div className="relative w-full min-h-screen flex items-center justify-center">
          <h3 className="text-center text-3xl md:text-6xl flex-1 tracking-wider">
            Loading...
          </h3>
        </div>
      ) : data ? (
        <div className="relative w-full  overflow-hidden min-h-screen">
          <div className="w-full h-screen absolute top-0 left-0 overflow-hidden z-0">
            <div className="h-4/6 relative overflow-hidden">
              <div
                className="w-full h-full absolute top-0 z-0 bg-center bg-cover bg-no-repeat overflow-hidden "
                style={{
                  zIndex: -10,
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${
                    data.backdrop_path || data.poster_path
                  })`,
                  filter: "blur(3px)",
                }}
              ></div>
              <div className="w-full absolute  h-full bg-top bg-cover bg-gradient-to-b from-transparent z-0 to-gray-900  bg-no-repeat overflow-hidden"></div>
            </div>
          </div>
          <div className="z-10 relative">
            <div className=" pt-36 md:pt-96 pb-28">
              <div className="w-full flex flex-col md:flex-row items-center ">
                <div className="flex-1 max-w-md ">
                  <img
                    src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
                    className="h-72 w-72 mx-auto overflow-hidden drop-shadow-lg"
                    alt={data.title}
                  />
                </div>
                <div className="flex flex-1 px-10 py-5 justify-between w-full">
                  <h3 className=" text-3xl md:text-6xl flex-1 tracking-wider">
                    {data.original_title || data.name}
                  </h3>
                  <button
                    className="bg-green-400 flex-none  rounded-full w-12 h-12 md:w-16 md:h-16 md:mx-10 shadow-2xl flex items-center justify-center"
                    onClick={() => {
                      if (
                        id.toString() in value &&
                        value[id.toString()].bookmarked
                      ) {
                        setter(id.toString(), {
                          bookmarked: false,
                          note: "",
                          item: data,
                        });
                      } else {
                        setter(id.toString(), {
                          bookmarked: true,
                          note: "",
                          item: data,
                        });
                      }
                    }}
                  >
                    {id.toString() in value &&
                    value[id.toString()].bookmarked ? (
                      <Image
                        src="/assets/icons/unbookmark.svg"
                        alt="unmark"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        src="/assets/icons/bookmark.svg"
                        alt="bookmark"
                        width={30}
                        height={30}
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full flex py-5 px-8 flex-col md:flex-row md:px-14 justify-between space-y-10">
                <div className="flex-1 flex flex-col md:space-y-4">
                  <h4 className="text-2xl md:text-4xl text-red-300 underline font-bold md:font-extrabold mb-3">
                    About:
                  </h4>
                  <div className="text-blue-400 space-y-2">
                    <DataDisplay heading="Overview" data={data.overview} />
                    <DataDisplay
                      heading="rated"
                      data={data.adult ? "Adult" : "Universal"}
                    />
                    <DataDisplay heading="Popularity" data={data.popularity} />
                    <DataDisplay heading="Vote Count" data={data.vote_count} />
                    <DataDisplay
                      heading="Average Vote"
                      data={data.vote_average}
                    />
                  </div>
                </div>
                <div className="w-full max-w-sm">
                  {id.toString() in value && value[id.toString()].bookmarked && (
                    <>
                      <h4 className="text-xl mb-3"> Pointers</h4>
                      <textarea
                        value={value[id.toString()].note}
                        onChange={({ target: { value } }) =>
                          setter(id.toString(), {
                            bookmarked: true,
                            note: value,
                            item: data,
                          })
                        }
                        className="w-full h-32 p-2 shadow-sm text-black"
                        placeholder="Enter Your Notes Here"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full min-h-screen flex items-center justify-center">
          <h3 className=" text-3xl text-center md:text-6xl flex-1 tracking-wider">
            Not Avaiable
          </h3>
        </div>
      )}
    </Layout>
  );
}

const DataDisplay: FC<{ heading: string; data: string | number }> = ({
  data,
  heading,
}) => (
  <p className="text-xl  md:text-2xl mb-1">
    <span className="underline mr-2 text-green-300 capitalize">{heading}:</span>
    <span className="font-light">{data}</span>
  </p>
);
