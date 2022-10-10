import React from "react";
import { MovieList } from "../movie/MovieList";

export const HomePage = () => {
  return (
    <>
      <section className="movie-layer page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold ">
          Now playing
        </h2>
        <MovieList />
      </section>

      <section className="movie-layer page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold ">
          Top rated
        </h2>
        <MovieList type="top_rated" />
      </section>
      <section className="movie-layer page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top treding
        </h2>
        <MovieList type="popular" />
      </section>
    </>
  );
};
