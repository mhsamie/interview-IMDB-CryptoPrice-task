"use client";
import Link from "next/link";
import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";

const Header = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <header className="flex justify-between py-4 bg-white px-2 md:px-5 xl:px-10">
      <div className="font-bold text-blue-900">
        <span>Fatemeh Samie Task</span>
      </div>
      <div className="flex gap-2">
        <Link
          className={`${
            segment === "movies"
              ? "bg-blue-100 text-blue-800"
              : "hover:bg-blue-100 hover:text-blue-800"
          } font-medium px-3 py-2 rounded-md duration-200`}
          href={"/movies"}
        >
          IMDB
        </Link>
        <Link
          className={`${
            segment === null
              ? "bg-blue-100 text-blue-800"
              : "hover:bg-blue-100 hover:text-blue-800"
          } font-medium px-3 py-2 rounded-md duration-200`}
          href={"/"}
        >
          Crypto Info
        </Link>
      </div>
    </header>
  );
};

export default Header;
