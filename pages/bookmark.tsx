import { useContext, useEffect, useState } from "react";
import { API_KEY } from "../api-key";
import { ItemGrid } from "../components/ItemGrid";
import Layout from "../components/layout";
import { useDateFetcher } from "../hooks/useDataFetcher";
import { BookmarkContext } from "./_app";

export default function GenrePage() {
  const { getGenres } = useDateFetcher(API_KEY);
  const [items, setItems] = useState<Item[]>([]);
  const { value } = useContext(BookmarkContext);
  const [genreMap, setGenreMap] = useState({});

  useEffect(() => {
    let data = [];
    Object.keys(value).forEach((key) => data.push(value[key].item));
    setItems(data);
    getGenres().then((data: Genre[]) => {
      const map: Record<string, string> = {};
      data.forEach((singleGenre) => {
        map[singleGenre.id.toString()] = singleGenre.name;
      });
      setGenreMap(map);
    });
  }, [value]);
  return (
    <Layout>
      <div className="m-2 space-y-2 max-w-5xl mx-auto py-4">
        <ItemGrid list={items} title="Bookmarked" genreMap={genreMap} />
      </div>
    </Layout>
  );
}
