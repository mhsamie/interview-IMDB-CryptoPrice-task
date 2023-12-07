"use client";

import { movieDetailType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const MovieCard: FC<{
  data: movieDetailType;
  filmId: string[];
  likeHandler: (id: string) => void;
}> = ({ data, filmId, likeHandler }): JSX.Element => {
  return (
    <li className="rounded-lg flex flex-col  shadow  p-2 2xl:p-5 border border-gray-300 w-full h-full">
      <Image
        src={data?.Poster ?? ""}
        alt={data?.Title}
        width={100}
        height={100}
        className="w-full h-[280px] bg-[#212121]-100 rounded-md object-contain"
      />
      <div className="my-4 flex justify-end gap-4 flex-col h-full">
        <div className="flex justify-between items-center">
          <span className="font-bold">{data.Title}</span>
          <svg
            className="cursor-pointer"
            onClick={() => likeHandler(data?.imdbID)}
            fill={filmId.includes(data?.imdbID) ? "#b91c1c" : "#fcfcfc"}
            height="24px"
            width="24px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink={"http://www.w3.org/1999/xlink"}
            viewBox="0 0 490 490"
            xmlSpace="preserve"
          >
            <path
              id="XMLID_25_"
              d="M316.554,108.336c4.553,6.922,2.629,16.223-4.296,20.774c-3.44,2.261-6.677,4.928-9.621,7.929
	            c-2.938,2.995-6.825,4.497-10.715,4.497c-3.791,0-7.585-1.427-10.506-4.291c-5.917-5.801-6.009-15.298-0.207-21.212
	            c4.439-4.524,9.338-8.559,14.562-11.992C302.698,99.491,312.002,101.414,316.554,108.336z M447.022,285.869
	            c-1.506,1.536-148.839,151.704-148.839,151.704C283.994,452.035,265.106,460,245,460s-38.994-7.965-53.183-22.427L42.978,285.869
	            c-57.304-58.406-57.304-153.441,0-211.847C70.83,45.634,107.882,30,147.31,30c36.369,0,70.72,13.304,97.69,37.648
	            C271.971,43.304,306.32,30,342.689,30c39.428,0,76.481,15.634,104.332,44.021C504.326,132.428,504.326,227.463,447.022,285.869z
	            M425.596,95.028C403.434,72.44,373.991,60,342.69,60c-31.301,0-60.745,12.439-82.906,35.027c-1.122,1.144-2.129,2.533-3.538,3.777
	            c-7.536,6.654-16.372,6.32-22.491,0c-1.308-1.352-2.416-2.633-3.538-3.777C208.055,72.44,178.612,60,147.31,60
	            c-31.301,0-60.744,12.439-82.906,35.027c-45.94,46.824-45.94,123.012,0,169.836c1.367,1.393,148.839,151.704,148.839,151.704
	            C221.742,425.229,233.02,430,245,430c11.98,0,23.258-4.771,31.757-13.433l148.839-151.703l0,0
	            C471.535,218.04,471.535,141.852,425.596,95.028z M404.169,116.034c-8.975-9.148-19.475-16.045-31.208-20.499
            	c-7.746-2.939-16.413,0.953-19.355,8.698c-2.942,7.744,0.953,16.407,8.701,19.348c7.645,2.902,14.521,7.431,20.436,13.459
            	c23.211,23.658,23.211,62.153,0,85.811l-52.648,53.661c-5.803,5.915-5.711,15.412,0.206,21.212
	           c2.921,2.863,6.714,4.291,10.506,4.291c3.889,0,7.776-1.502,10.714-4.497l52.648-53.661
            	C438.744,208.616,438.744,151.275,404.169,116.034z"
            />
          </svg>
        </div>
        <div className="flex justify-between items-center text-sm  text-gray-400">
          <span>{data.Type}</span>
          <span>{data.Year}</span>
        </div>
      </div>
      <Link
        href={`/movies/${data?.Title}`}
        className="bg-yellow-400 text-center hover:bg-yellow-500 text-white rounded-full font-medium px-4 py-2"
      >
        Go To {data.Type}
      </Link>
    </li>
  );
};

export default MovieCard;
