"use client";
import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "./MovieCard";
import { movieDetailType } from "@/types";

const Movies = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [SearchableValue, setSearchableValue] = useState("all");
  const useGetMovie = (page: number, s: string) => {
    const fetchData = async () => {
      const data = await axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=21a719ad&s=${s}&page=${page}`
      );

      return data.data;
    };
    const movieData = useQuery({
      queryKey: ["movies-list", page, s],
      queryFn: fetchData,
    });

    return movieData;
  };
  const searchHandler = (e: any) => {
    if (e.target.value === "") {
      setSearchableValue("all");
    }
    setSearch(e.target.value);
  };

  const { data: movies, isLoading } = useGetMovie(page, SearchableValue);
  return (
    <>
      <div className="my-4 flex md:flex-row flex-col  md:justify-between">
        <h1 className="font-black text-lg ">IMBD Movies</h1>

        <div className="flex gap-1">
          {" "}
          <input
            onChange={searchHandler}
            value={search}
            className="focus:outline-none border-blue-500 border rounded-lg p-2 w-full md:w-56 lg:w-64 "
            placeholder="search..."
          />
          <button
            onClick={() => setSearchableValue(search)}
            className="px-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            <svg
              fill="white"
              className=" w-5 h-5 lg:w-6 lg:h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
            </svg>
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          movies?.Search?.map((m: movieDetailType) => (
            <MovieCard key={m.imdbID} data={m} />
          ))
        )}
      </ul>
      <div className="flex my-10 py-5 justify-between gap-4 items-center">
        <span className="text-sm font-medium">
          page {page} of {Math.floor(movies?.totalResults / 10)}
        </span>
        <div className=" flex flex-row-reverse gap-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium text-sm"
            onClick={() => setPage((prev) => prev + 1)}
          >
            next
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium text-sm"
            onClick={() => setPage((prev) => prev - 1)}
          >
            prev
          </button>{" "}
        </div>
      </div>
    </>
  );
};

export default Movies;