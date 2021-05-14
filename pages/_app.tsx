import { createContext, useCallback, useEffect, useState } from "react";
import "../styles/globals.css";

const BookmarkContext = createContext<{
  value: Record<string, Bookmarked>;
  setter: (id: string, data: Bookmarked) => void;
}>({
  setter: () => {},
  value: {},
});

function MyApp({ Component, pageProps }) {
  const [bookmarkData, setBookmarkData] = useState<Record<string, Bookmarked>>(
    {}
  );
  useEffect(() => {
    const data = localStorage.getItem("bookmark-data");
    if (data) {
      try {
        let actualData = JSON.parse(data);
        setBookmarkData(actualData);
      } catch (err) {
        console.log(err.message);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("bookmark-data", JSON.stringify(bookmarkData));
  }, [bookmarkData]);
  const updater = useCallback(
    (id: string, data: Bookmarked) =>
      setBookmarkData((ps) => ({
        ...ps,
        [id]: {
          ...data,
        },
      })),
    []
  );
  return (
    <BookmarkContext.Provider
      value={{
        value: bookmarkData,
        setter: updater,
      }}
    >
      <Component {...pageProps} />
    </BookmarkContext.Provider>
  );
}

export default MyApp;

export { BookmarkContext };
