import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/scss";
import "swiper/css/navigation";
import useSWR from "swr";
import { apiMovie, fetcher } from "apiconfig/configs";
import { MovieCard } from "components/movie/MovieCard";

export const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { data, error } = useSWR(apiMovie.getMovieList(type), fetcher);

  // const movies =data ?.results || []
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <div className="movie-list ">
      <div className="flex justify-end gap-3 mb-5 mr-5 ">
        <button
          ref={prevRef}
          className="transition-all rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
            color="#000"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          ref={nextRef}
          className="rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
            color="#000"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <Swiper
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        grabCursor="true"
        spaceBetween={35}
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
