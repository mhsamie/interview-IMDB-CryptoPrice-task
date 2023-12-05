"use client";
import Link from "next/link";
import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";

const Header = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <header className="flex justify-between py-4 bg-[#212121] px-2 md:px-5 xl:px-10">
      <div className="font-bold text-yellow-200 text-sm md:text-base">
        <span>Fatemeh Samie Task</span>
      </div>
      <div className="flex gap-1 md:gap-2">
        <Link
          className={`${
            segment === "movies"
              ? "bg-yellow-100 text-yellow-600"
              : "hover:bg-yellow-100 hover:text-yellow-600"
          } font-medium px-2 py-1 md:px-3 md:py-2 rounded-md text-sm md:text-base duration-200`}
          href={"/movies"}
        >
          IMDB
        </Link>
        <Link
          className={`${
            segment === null
              ? "bg-yellow-100 text-yellow-500"
              : "hover:bg-yellow-100 hover:text-yellow-500"
          } font-medium px-2 py-1 text-sm md:text-base md:px-3 md:py-2 rounded-md duration-200`}
          href={"/"}
        >
          Crypto Info
        </Link>
      </div>
    </header>
  );
};

export default Header;
