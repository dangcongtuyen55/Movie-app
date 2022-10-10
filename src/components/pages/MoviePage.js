import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";

export const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=22de5f1bf9b3ee77f0924b94f1f3cd3b`,
    fetcher
  );

  // const movies =data ?.results || []
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <>
      <div className="pb-10 page-container">
        <div className="flex mb-10  p-4">
          <div className="flex-1">
            <input
              type="text"
              className="w-full p-4 text-white bg-slate-800 outline-none"
              placeholder="Type here to search..."
            />
          </div>
          <button className="p-4 bg-primary text-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {movies.length > 0 &&
            movies.map((item) => {
              return (
                <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt=""
                    className="w-full h-[250px] object-cover rounded-lg mb-5"
                  />
                  <div className="flex flex-col flex-1">
                    <h3 className="text-white text-xl font-bold">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                      <span>{new Date(item.release_date).getFullYear()}</span>
                      <span>{item.vote_average}</span>
                    </div>
                    <button className="capitalize py-3 px-6 rounded-lg bg-primary text-white font-medium w-full mt-auto">
                      Watch now
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
