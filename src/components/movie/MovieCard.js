import React from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/banner.jpg";

export const MovieCard = ({ item }) => {
  const { id, title, vote_average, poster_path, release_date } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button
          onClick={() => navigate(`/movie/${id}`)}
          className="capitalize py-3 px-6 rounded-lg bg-primary text-white font-medium w-full mt-auto"
        >
          Watch now
        </button>
      </div>
    </div>
  );
};
