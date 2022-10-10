import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { MovieCard } from "../movie/MovieCard";

//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key> --- api category ---

export const MovieDetail = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { title, backdrop_path, poster_path, genres, overview } = data;

  return (
    <div className="pb-10">
      <div className="w-full h-[500px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="w-full h-full bg-cover rounded-xl"
        />
      </div>
      <h1 className="text-center text-3xl font-bold text-white mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => {
            return (
              <span className="py-2 px-4 border border-primary rounded-lg text-primary">
                {item.name}
              </span>
            );
          })}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredits />
    </div>
  );
};

function MovieCredits() {
  //https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>> --- api cast ---

  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;

  return (
    <div className="py-4">
      <h2 className="text-center text-2xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => {
          return (
            <div className="cast-item" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-medium">{item.name}</h2>
            </div>
          );
        })}
      </div>
      <MovieTrailers />
    </div>
  );
}

function MovieTrailers() {
  //https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>> --- api cast ---

  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 3).map((item) => (
          <div className="" key={item.id}>
            <h3 className="text-xl font-bold inline-block bg-secondary p-2 mb-5">
              {item.name}
            </h3>
            <div className="w-full aspect-video" key={item.id}>
              <iframe
                width="937"
                height="527"
                src={`https://www.youtube.com/embed/${item.key}`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
      <MovieSimilar />
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  //https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>> --- api similar ---
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="pb-10">
      <div className="movie-list">
        <Swiper grabCursor="true" spaceBetween={20} slidesPerView="auto">
          {results.length > 0 &&
            results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}
