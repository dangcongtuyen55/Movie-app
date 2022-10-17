import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
import "swiper/scss";
import "swiper/css/navigation";
import useSWR from "swr";
import { apiMovie, fetcher } from "apiconfig/configs";
import { MovieCard } from "components/movie/MovieCard";

export const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);

  const { data, error } = useSWR(apiMovie.getMovieList(type), fetcher);

  // const movies =data ?.results || []
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <div className="movie-list ">
      <Swiper
        grabCursor="true"
        spaceBetween={20}
        slidesPerView="auto"
        navigation={true}
        modules={[Navigation]}
        className="movie__list-swiper"
      >
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
