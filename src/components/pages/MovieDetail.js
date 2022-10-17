import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, apiMovie, fetcher } from "apiconfig/configs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { MovieCard } from "components/movie/MovieCard";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(apiMovie.getMovieDetail(movieId), fetcher);
  if (!data) return null;
  const {
    title,
    backdrop_path,
    poster_path,
    genres,
    overview,
    vote_average,
    runtime,
  } = data;
  const Hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return (
    <div className="pb-10">
      <div
        className=" w-full h-full md:h-[500px] bg-no-repeat bg-cover rounded-2xl  opacity-25 "
        style={{
          backgroundImage: `url(${apiMovie.imgOriginalUrl(backdrop_path)})`,
        }}
      ></div>

      <div className="relative md:-mt-[450px]  mb-10 z-10">
        <div className="z-50 grid grid-cols-1 md:flex flex-cols ">
          <div className="p-10">
            <img
              // src={`https://image.tmdb.org/t/p/original/${poster_path}`}
              src={apiMovie.imgOriginalUrl(poster_path)}
              alt=""
              className="w-[200px] h-full bg-cover rounded-xl"
            />
          </div>
          <div className="grid p-10 grid-cols">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex text-xl">
              {
                <>
                  <span className="mr-2">{Hours} hour</span>
                  <span>{minutes} minutes</span>
                </>
              }
            </div>
            <span className="flex text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                color="yellow"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              {vote_average}
            </span>

            <p className="max-w-3xl text-sm font-medium md:text-xl min-w-fit">
              {overview}
            </p>
            {genres.length > 0 && (
              <div className="grid items-center grid-cols-2 mt-2 md:justify-start md:flex md:gap-x-5 gap-y-5 gap-x-5">
                {genres.map((item) => {
                  return (
                    <span className="px-4 py-2 border rounded-lg border-primary text-primary">
                      {item.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <MovieCredits />
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    apiMovie.getMovieInfo(movieId, "credits"),
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;

  return (
    <div className="py-4 mt-20 ">
      <h2 className="mb-10 text-2xl text-center">Casts</h2>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 md:grid-cols-2">
        {cast.slice(0, 4).map((item) => {
          return (
            <div className="cast-item " key={item.id}>
              <img
                src={apiMovie.imgOriginalUrl(item.profile_path)}
                alt=""
                className=" w-[200px] h-[250px] md:w-full md:h-[500px]  object-cover rounded-lg mb-3"
              />
              <h2 className="text-xs font-medium sm:text-xl ">{item.name}</h2>
            </div>
          );
        })}
      </div>
      <MovieTrailers />
    </div>
  );
}

function MovieTrailers() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    apiMovie.getMovieInfo(movieId, "videos"),
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
            <h3 className="inline-block p-2 mb-5 text-xl font-bold bg-secondary">
              {item.name}
            </h3>

            <div
              className="w-full aspect-w-16 aspect-h-9 sm:aspect-[10/5] "
              key={item.id}
            >
              <iframe
                width="937"
                height="527"
                src={`https://www.youtube.com/embed/${item.key}`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="object-fill w-full h-full mb-10"
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

  const { data, error } = useSWR(
    apiMovie.getMovieInfo(movieId, "similar"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="pb-10">
      <h2 className="mb-10 text-3xl font-medium">Similar</h2>
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

export default MovieDetail;
