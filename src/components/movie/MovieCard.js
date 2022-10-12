import React from "react";
import { useNavigate } from "react-router-dom";
import { apiMovie } from "apiconfig/configs";
import { Button } from "components/button/Button";

export const MovieCard = ({ item }) => {
  const { id, title, vote_average, poster_path, release_date } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-[350px]  sm:h-full sm:w-full  select-none">
      <img
        src={apiMovie.imgW500Url(poster_path)}
        alt=""
        className="w-full h-[250px] sm:w-full sm:h-full object-cover  rounded-lg mb-5"
        onClick={() => navigate(`/movie/${id}`)}
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-white text-xs font-bold sm:text-xl truncate ">
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>

        {/* <Button
          onClick={() => navigate(`/movie/${id}`)}
          bgColor="primary"
          className={"text-xs"}
        >
          Watch now
        </Button> */}
      </div>
    </div>
  );
};
