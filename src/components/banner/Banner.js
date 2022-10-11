import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
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
    <section className="banner h-[400px] page-container mb-20">
      <Swiper>
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
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>

      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg object-top"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-lg">
            Action
          </span>
          <span className="py-2 px-4 border border-white rounded-lg">
            Action
          </span>
          <span className="py-2 px-4 border border-white rounded-lg">
            Action
          </span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)} bgColor="primary">
          Watch now
        </Button>
      </div>
    </div>
  );
}
