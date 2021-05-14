import { useEffect, useState } from "react";
import { API_KEY } from "../api-key";
import { ItemGrid } from "../components/ItemGrid";
import Layout from "../components/layout";
import { useDateFetcher } from "../hooks/useDataFetcher";

export default function Home() {
  const { getTrending, getGenres } = useDateFetcher(API_KEY);
  const [items, setItems] = useState<Item[]>([]);
  const [genreMap, setGenreMap] = useState({});
  useEffect(() => {
    getTrending().then((data) => {
      setItems(data);
    });
    getGenres().then((data: Genre[]) => {
      const map: Record<string, string> = {};
      data.forEach((singleGenre) => {
        map[singleGenre.id.toString()] = singleGenre.name;
      });
      setGenreMap(map);
    });
  }, []);
  return (
    <Layout>
      <div className="m-2 space-y-2 max-w-5xl mx-auto py-4">
        <ItemGrid list={items} title="Trending" genreMap={genreMap} />
      </div>
    </Layout>
  );
}
