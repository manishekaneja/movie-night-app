import { FC } from "react";
import { ItemCard } from "./ItemCard";

export const ItemGrid: FC<{
  list: Item[];
  title?: string;
  genreMap?: Record<number, string>;
}> = ({ title = "Untitled", list, genreMap = {} }) => {
  return (
    <>
      <div className="text-3xl md:text-center">
        <h2>{title}...</h2>
      </div>
      <div className="grid grid-cols-1 p-2 lg:p-0 sm:grid-cols-2 md:grid-cols-3 hover-high gap-8 relative">
        {list.map((singleItem) => (
          <ItemCard genreMap={genreMap} data={singleItem} key={singleItem.id} />
        ))}
      </div>
    </>
  );
};
