import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_KEY } from "../../api-key";
import { ItemGrid } from "../../components/ItemGrid";
import Layout from "../../components/layout";
import { useDateFetcher } from "../../hooks/useDataFetcher";

export default function GenrePage() {
  const router = useRouter();
  const { id } = router.query;
  const { getGenreBasedMovies, getGenres } = useDateFetcher(API_KEY);
  const [genreTitle, setGenreTitle] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [genreMap, setGenreMap] = useState<Record<number, string>>({});

  useEffect(() => {
    getGenreBasedMovies(id).then((data) => {
      setItems(data);
    });
    getGenres().then((data: Genre[]) => {
      const map: Record<string, string> = {};
      data.forEach((singleGenre) => {
        map[singleGenre.id.toString()] = singleGenre.name;
      });
      setGenreMap(map);
      setGenreTitle(map[id as string]);
    });
  }, [id]);
  return (
    <Layout>
      <div className="m-2 space-y-2 max-w-5xl mx-auto py-4">
        <ItemGrid list={items} title={genreTitle} genreMap={genreMap} />
      </div>
    </Layout>
  );
}
