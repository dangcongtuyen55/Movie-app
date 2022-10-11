export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const apiKey = "22de5f1bf9b3ee77f0924b94f1f3cd3b";

const apiFirstPoint = "https://api.themoviedb.org/3/movie";
const apiFirstPointSearch = "https://api.themoviedb.org/3/search/movie";

export const apiMovie = {
  getMovieList: (type, page = 1) =>
    `${apiFirstPoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetail: (movieId) => `${apiFirstPoint}/${movieId}?api_key=${apiKey}`,
  getMovieInfo: (movieId, type) =>
    `${apiFirstPoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieTrailer: (movieId) =>
    `${apiFirstPoint}/${movieId}/videos?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${apiFirstPointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  imgOriginalUrl: (param) => `https://image.tmdb.org/t/p/original/${param}`,
  imgW500Url: (param) => `https://image.tmdb.org/t/p/w500/${param}`,
};

//https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}
