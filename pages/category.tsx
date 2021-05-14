import Link from "next/link";
import { useEffect, useState } from "react";
import { API_KEY } from "../api-key";
import Layout from "../components/layout";
import { useDateFetcher } from "../hooks/useDataFetcher";

export default function Catergory() {
  const { getGenres } = useDateFetcher(API_KEY);
  const [genres, setGenres] = useState<Array<Genre>>([]);
  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data);
    });
  }, []);
  return (
    <Layout>
      <div className="m-2 space-y-2 max-w-5xl mx-auto">
        <div className="text-3xl md:text-center">
          <h2>Select a Catergory</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {genres.map((singleGenre) => (
            <Link key={singleGenre.id} href={"/genre/" + singleGenre.id}>
              <div className="bg-gray-800 p-0 space-y-0  divide-y divide-white">
                <div />
                <p className="text-center tracking-wider py-2 md:py-4 md:text-2xl text-xl h-full">
                  {singleGenre.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
