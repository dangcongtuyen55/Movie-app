import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/scss";

import useSWR from "swr";
import { fetcher } from "apiconfig/configs";
import { Button } from "components/button/Button";

export const Banner = () => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=22de5f1bf9b3ee77f0924b94f1f3cd3b`,
    fetcher
  );

  // const movies =data ?.results || []
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <section className="banner h-[500px] rounded-3xl page-container mb-20">
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="banner__swiper"
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <ItemBanner item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function ItemBanner({ item }) {
  const { id, title, poster_path } = item;
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full rounded-3xl">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-3xl"></div>

      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="object-cover object-top w-full h-full rounded-3xl"
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-lg">
            Action
          </span>
          <span className="px-4 py-2 border border-white rounded-lg">
            Action
          </span>
          <span className="px-4 py-2 border border-white rounded-lg">
            Action
          </span>
        </div>
        <Button
          onClick={() => navigate(`/movie/${id}`)}
          bgColor="primary"
          className={"flex gap-3"}
        >
          Watch now
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
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
