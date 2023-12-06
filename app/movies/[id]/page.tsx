"use client";
import Image from "next/image";
import { eachMovieDetailsType } from "@/types";
import Spiner from "@/components/loaders/Spiner";
import useGetSelectedMovie from "@/hooks/useGetSelectedMovieQuery";

const page = ({ params }: { params: { id: string } }) => {
  const { data, isError, isLoading } = useGetSelectedMovie(params.id);

  if (isError || data?.Error?.length)
    return (
      <div className="text-red-border-red-600 font-medium text-sm border border-red-600 p-4 bg-red-200">
        {" "}
        <span>Error: can not find the movie due to stupid reasons.</span>
      </div>
    );
  return (
    <div className="flex flex-col gap-5 lg:flex-row-reverse lg:justify-between lg:gap-0 items-start py-10">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spiner />
        </div>
      ) : (
        <>
          <div>
            <Image
              src={(data as eachMovieDetailsType)?.Poster}
              alt={(data as eachMovieDetailsType)?.Title}
              width={380}
              height={550}
              className=" bg-black rounded-md object-contain"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>{(data as eachMovieDetailsType)?.Title}</span>
            <span>{(data as eachMovieDetailsType)?.Type}</span>
            <span>{(data as eachMovieDetailsType)?.Director}</span>
            <span>{(data as eachMovieDetailsType)?.BoxOffice}</span>
            <span>{(data as eachMovieDetailsType)?.Awards}</span>
            <span>{(data as eachMovieDetailsType)?.Country}</span>
            <div className="w-full"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
