"use client";
import Image from "next/image";
import React, { FC } from "react";
import Spiner from "../loaders/Spiner";
import useGetSelectedMovie from "@/hooks/useGetSelectedMovieQuery";
import { eachMovieDetailsType } from "@/types";

const MoviePage: FC<{ name: string }> = ({ name }) => {
  const { data, isError, isLoading } = useGetSelectedMovie(name);

  if (isError || data?.Error?.length)
    return (
      <div className="text-red-border-red-600 font-medium text-sm border border-red-600 p-4 bg-red-200">
        {" "}
        <span>Error: can not find the movie due to stupid reasons.</span>
      </div>
    );

  return (
    <div className="flex flex-col gap-5 xl:gap-10 lg:flex-row-reverse lg:justify-between  items-start py-10 px-2 lg:px-5 xl:px-0">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spiner />
        </div>
      ) : (
        <>
          <Image
            src={(data as eachMovieDetailsType)?.Poster}
            alt={(data as eachMovieDetailsType)?.Title}
            width={380}
            height={550}
            className=" w-full md:min-w-[500px]  max-h-96 md:msx-h-auto md:h-[600px] lg:h-[850px] xl:h-[620px] bg-black rounded-md object-contain"
          />

          <div className="flex flex-col gap-2 max-w-[790px] ">
            <span className="text-lg md:text-xl xl:text-2xl font-bold mb-5">
              {(data as eachMovieDetailsType)?.Title}
            </span>
            <span className="text-sm text-gray-200">
              {(data as eachMovieDetailsType)?.Type}
              {", "}
              {(data as eachMovieDetailsType)?.Genre}
              {", "}
              {(data as eachMovieDetailsType)?.Year}
            </span>
            <span className="text-sm text-gray-200"></span>
            <span>
              {" "}
              <span className="text-gray-400 text-sm">Director: </span>
              {(data as eachMovieDetailsType)?.Director}
            </span>
            <span>
              {" "}
              <span className="text-gray-400 text-sm">Box Office: </span>
              {(data as eachMovieDetailsType)?.BoxOffice}
            </span>
            <span>
              {" "}
              <span className="text-gray-400 text-sm">Awards: </span>
              {(data as eachMovieDetailsType)?.Awards}
            </span>
            <span>
              {" "}
              <span className="text-gray-400 text-sm">Country: </span>
              {(data as eachMovieDetailsType)?.Country}
            </span>
            <span>
              <span className="text-gray-400">Metascore: </span>
              {(data as eachMovieDetailsType)?.Metascore}
            </span>
            <span>
              <span className="text-gray-400">Writer: </span>
              {(data as eachMovieDetailsType)?.Writer}
            </span>
            <span>
              <span className="text-gray-400">Runtime: </span>
              {(data as eachMovieDetailsType)?.Runtime}
            </span>
            <div className="flex my-10 flex-col gap-2 w-full border border-gray-400 rounded-xl shadow-sm shadow-amber-400 text-sm p-5">
              <span>
                <span className="text-gray-400">plot: </span>
                {(data as eachMovieDetailsType)?.Plot}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
