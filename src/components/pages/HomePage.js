import { MovieList } from "components/movie/MovieList";
import React from "react";

const HomePage = () => {
  return (
    <>
      <section className="pb-20 movie-layer page-container ">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize ">
          Now playing
        </h2>
        <MovieList />
      </section>

      <section className="pb-20 movie-layer page-container">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize ">
          Top rated
        </h2>
        <MovieList type="top_rated" />
      </section>
      <section className="pb-20 movie-layer page-container">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize">
          Top treding
        </h2>
        <MovieList type="popular" />
      </section>
    </>
  );
};

export default HomePage;
