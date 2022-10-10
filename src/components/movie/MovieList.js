import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { apiKey, fetcher } from "../../config";
import { MovieCard } from "./MovieCard";

//https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
//22de5f1bf9b3ee77f0924b94f1f3cd3b
export const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`,
    fetcher
  );

  // const movies =data ?.results || []
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <div className="movie-list">
      <Swiper grabCursor="true" spaceBetween={20} slidesPerView="auto">
        {movies.length > 0 &&
          movies.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard item={item} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
