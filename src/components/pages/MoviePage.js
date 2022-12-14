import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import { apiMovie, fetcher } from "apiconfig/configs";
import useDebounce from "hooks/useDebounce";
import { MovieCard } from "components/movie/MovieCard";
import { Pagination } from "@mui/material";

const itemsPerPage = 20;
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState(apiMovie.getMovieList("popular", nextPage));

  const searchDebounce = useDebounce(search, 200);

  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  useEffect(() => {
    if (data && data.results) setMovies(data.results);
    if (searchDebounce) {
      setUrl(apiMovie.getMovieSearch(searchDebounce, nextPage));
    } else {
      setUrl(apiMovie.getMovieList("popular", nextPage));
    }
  }, [data, searchDebounce, nextPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;

    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <>
      <div className="pb-10 page-container">
        <div className="flex mb-10  p-4">
          <div className="flex-1">
            <input
              type="text"
              className="w-full p-4 text-white bg-slate-800 outline-none"
              placeholder="Type here to search..."
              onChange={handleSearchChange}
            />
          </div>
          <button className="p-4 bg-primary text-white rounded-lg">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        {loading && (
          <div className=" w-16 h-16 mx-auto border-4 border-dashed rounded-full animate-spin dark:border-primary"></div>
        )}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-10">
          {!loading &&
            movies.length > 0 &&
            movies.map((item) => {
              return <MovieCard key={item.id} item={item} />;
            })}
        </div>
        <div className="mt-10">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageClick}
            // pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="<<"
            renderOnZeroPageCount={null}
            className="panigation"
          />
          {/* <Pagination
            count={pageCount}
            onChange={handlePageClick}
            color="primary"
          /> */}
        </div>
      </div>
    </>
  );
};

export default MoviePage;
