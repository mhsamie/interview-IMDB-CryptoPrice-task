import { movieDetailType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const MovieCard = ({ data }: { data: movieDetailType }): JSX.Element => {
  return (
    <Link href={`/movies/${data?.Title}`}>
      <li className="rounded-lg shadow hover:shadow-lg p-2 2xl:p-5 border border-gray-300 w-full h-full">
        <Image
          src={data?.Poster}
          alt={data?.Title}
          width={100}
          height={100}
          className="w-full h-[280px] bg-gray-100 rounded-md object-contain"
        />
        <div className="">
          <span>{data.Title}</span>
          <span>{data.Year}</span>
          <span>{data.Type}</span>
        </div>
      </li>
    </Link>
  );
};

export default MovieCard;
