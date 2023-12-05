"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { eachMovieDetailsType } from "@/types";

const page = ({ params }: { params: { id: string } }) => {
  const useGetSelectedMovie = () => {
    const fetchData = async () => {
      const data = await axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=21a719ad&t=${params?.id}`
      );
      return data.data;
    };
    const eachMoviedata = useQuery({
      queryKey: ["movie-detail"],
      queryFn: fetchData,
    });
    return eachMoviedata;
  };

  const { data, isError } = useGetSelectedMovie();

  if (isError || data?.Error?.length)
    return (
      <div className="text-red-border-red-600 font-medium text-sm border border-red-600 p-4 bg-red-200">
        {" "}
        <span>Error: can not find the movie due to stupid reasons.</span>
      </div>
    );
  return (
    <div className="flex flex-col gap-5 lg:flex-row-reverse lg:justify-between lg:gap-0 items-start">
      <div>
        <Image
          src={(data as eachMovieDetailsType)?.Poster}
          alt={(data as eachMovieDetailsType)?.Title}
          width={100}
          height={100}
          className="w-[400px] h-full bg-black rounded-md object-contain"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span>{(data as eachMovieDetailsType)?.Title}</span>
        <span>{(data as eachMovieDetailsType)?.Type}</span>
        <span>{(data as eachMovieDetailsType)?.Director}</span>
        <span>{(data as eachMovieDetailsType)?.BoxOffice}</span>
        <span>{(data as eachMovieDetailsType)?.Awards}</span>
        <span>{(data as eachMovieDetailsType)?.Country}</span>
      </div>
    </div>
  );
};

export default page;
