import React from "react";
import { useNavigate } from "react-router-dom";
import { apiMovie } from "apiconfig/configs";
import { Button } from "components/button/Button";

export const MovieCard = ({ item }) => {
  const { id, title, vote_average, poster_path, release_date } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-[350px]  w-[200px] md:h-full md:w-full  select-none">
      <img
        src={apiMovie.imgW500Url(poster_path)}
        alt=""
        className="w-full h-[250px] md:w-full md:h-[350px] object-cover  rounded-lg mb-5"
        onClick={() => navigate(`/movie/${id}`)}
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xs font-bold text-white truncate md:text-xl ">
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm ">
          <span>{new Date(release_date).getFullYear()}</span>
          <span className="flex items-center gap-1 ">
            {vote_average}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              color="yellow"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </span>
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
