import { FC } from "react";

export const Tag: FC<{ data: string }> = ({ data }) => (
  <span className="text-sm m-1 bg-gray-200 p-1 text-black rounded">{data}</span>
);
