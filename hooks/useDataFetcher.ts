const { useCallback } = require("react");

const ENDPOINT = `https://api.themoviedb.org/3/`;

const API_SET: Record<
  "movies" | "trending" | "keyword" | "singleMovieDetail",
  string
> = {
  movies: "genre/movie/list?api_key=",
  trending: "trending/movie/day?api_key=",
  keyword: "genre/",
  singleMovieDetail: "movie/",
};
function useDateFetcher(apiKey) {
  const getGenres = useCallback(async () => {
    const response: { genres: Array<Genre> } = await fetch(
      ENDPOINT + API_SET.movies + apiKey
    ).then((r) => r.json());
    return response.genres;
  }, [apiKey]);

  const getGenreBasedMovies = useCallback(
    async (id: string | number) => {
      if (!id) {
        return [];
      }
      const response: { results: Array<Item> } = await fetch(
        ENDPOINT + API_SET.keyword + id + "/movies?api_key=" + apiKey
      ).then((r) => r.json());
      console.log(response);
      return response.results;
    },
    [apiKey]
  );
  const getMovieDetails = useCallback(
    async (id: string | number) => {
      if (!id) {
        return null;
      }
      const response: { results: Array<Item> } = await fetch(
        ENDPOINT + API_SET.singleMovieDetail + id + "?api_key=" + apiKey
      ).then((r) => r.json());

      // @ts-ignore
      if (!response.status) {
        throw new Error("Call Failed");
      }

      return response;
    },
    [apiKey]
  );

  const getTrending = useCallback(async () => {
    const response: { results: Item[] } = await fetch(
      ENDPOINT + API_SET.trending + apiKey
    ).then((r) => r.json());
    return response.results;
  }, [apiKey]);

  return { getGenres, getTrending, getGenreBasedMovies, getMovieDetails };
}
export { useDateFetcher };
