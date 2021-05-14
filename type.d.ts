type Genre = {
  id: number;
  name: string;
};

type Item = {
  name?: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  media_type: "movie";
  original_language: "en";
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Bookmarked = { bookmarked: boolean; note: string; item: Item };
